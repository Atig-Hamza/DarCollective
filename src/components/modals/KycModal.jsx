import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Camera, ChevronRight, ChevronLeft, Check, RefreshCw, User, FileText, Smartphone } from 'lucide-react';
import axios from 'axios';

const Loader2 = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

const KycModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nationalId: '',
        idCardImage: null, 
        selfieImage: null  
    });

    
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setIsSubmitted(false);
            setIsSubmitting(false);
            setFormData({
                firstName: '',
                lastName: '',
                nationalId: '',
                idCardImage: null,
                selfieImage: null
            });
        }
        return () => stopCamera();
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, [field]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    
    const startCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please allow camera permissions.");
            setIsCameraOpen(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const context = canvas.getContext('2d');
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            
            const imageSrc = canvas.toDataURL('image/png');
            setFormData(prev => ({ ...prev, selfieImage: imageSrc }));
            stopCamera();
        }
    };

    
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const data = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                nationalId: formData.nationalId.trim(),
                idCardImage: formData.idCardImage, 
                selfieImage: formData.selfieImage  
            };
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response = await axios.post('http://localhost:5000/api/v1/kyc', data, config);
            console.log('Submission Successful:', response.data);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Submission Error:', error);         
            alert(`Error: ${error.response?.data?.message || error.message || 'Failed to submit KYC data'}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    const canProceed = () => {
        if (step === 1) return formData.firstName && formData.lastName && formData.nationalId;
        if (step === 2) return formData.idCardImage;
        if (step === 3) return formData.selfieImage;
        return true;
    };
    const nextStep = () => {
        if (canProceed()) setStep(prev => Math.min(prev + 1, 4));
    };
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={!isSubmitting ? onClose : undefined} 
            />
            <div className="relative bg-white w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
                <div className="bg-[#F9F9F7] px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                    <div>
                        <h3 className="text-xl font-bold text-[#111]">
                            {isSubmitted ? 'Verification Complete' : 'Identity Verification'}
                        </h3>
                        {!isSubmitted && (
                            <p className="text-sm text-gray-500 font-medium mt-1">Step {step} of 4</p>
                        )}
                    </div>
                    <button 
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 disabled:opacity-50"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                {!isSubmitted && (
                    <div className="w-full h-1.5 bg-gray-100">
                        <div
                            className="h-full bg-[#FCD34D] transition-all duration-500 ease-out rounded-r-full"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                )}  
                <div className="flex-1 overflow-y-auto p-8 relative">
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-12 h-12 text-green-600" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
                                <p className="text-gray-500 max-w-xs mx-auto">
                                    Your documents have been submitted successfully. We will notify you once verified.
                                </p>
                            </div>
                            <button 
                                onClick={onClose}
                                className="w-full bg-[#111] text-white py-4 rounded-xl font-medium hover:bg-black/80 transition-all shadow-lg shadow-black/10 mt-4"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <>
                            {step === 1 && (
                                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Personal Information</h4>
                                            <p className="text-sm text-gray-500">Enter your details exactly as they appear on your ID.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FCD34D] focus:ring-4 focus:ring-[#FCD34D]/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FCD34D] focus:ring-4 focus:ring-[#FCD34D]/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">National ID Number</label>
                                        <input
                                            type="text"
                                            name="nationalId"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FCD34D] focus:ring-4 focus:ring-[#FCD34D]/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                            placeholder="A12345678"
                                            value={formData.nationalId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            )}
                            
                            {step === 2 && (
                                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                                     <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Upload ID Card</h4>
                                            <p className="text-sm text-gray-500">Ensure text is clear and readable.</p>
                                        </div>
                                    </div>

                                    <label className="block w-full aspect-[1.6] rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#FCD34D] hover:bg-[#FCD34D]/5 transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group bg-gray-50">
                                        {formData.idCardImage ? (
                                            <>
                                                <img src={formData.idCardImage} alt="ID Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">Click to change</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <Upload className="w-8 h-8 text-[#FCD34D]" />
                                                </div>
                                                <span className="text-base font-bold text-gray-700">Click to upload ID</span>
                                                <span className="text-xs text-gray-400 mt-2">SVG, PNG, JPG (Max 5MB)</span>
                                            </>
                                        )}
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'idCardImage')} />
                                    </label>
                                </div>
                            )}
                            
                            {step === 3 && (
                                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                                            <Smartphone size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Take a Selfie</h4>
                                            <p className="text-sm text-gray-500">Position your face within the frame.</p>
                                        </div>
                                    </div>
                                    <div className="relative w-full aspect-[3/4] max-w-[280px] mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100 ring-1 ring-gray-200">
                                        {formData.selfieImage ? (
                                            <div className="relative h-full w-full">
                                                <img src={formData.selfieImage} alt="Selfie" className="w-full h-full object-cover transform scale-x-[-1]" />
                                                <button
                                                    onClick={() => setFormData(prev => ({ ...prev, selfieImage: null }))}
                                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/30 transition-all flex items-center gap-2"
                                                >
                                                    <RefreshCw size={14} />
                                                    Retake Photo
                                                </button>
                                            </div>
                                        ) : isCameraOpen ? (
                                            <div className="relative h-full w-full flex flex-col bg-gray-900">
                                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                                                <canvas ref={canvasRef} className="hidden" />

                                                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                                                     <button
                                                        onClick={stopCamera}
                                                        className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/20 transition"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center pb-8 bg-gradient-to-t from-black/80 to-transparent">
                                                    <button 
                                                        onClick={capturePhoto}
                                                        className="w-16 h-16 bg-white rounded-full border-4 border-gray-200/50 hover:border-[#FCD34D] transition-all shadow-lg flex items-center justify-center active:scale-95"
                                                    >
                                                        <div className="w-14 h-14 bg-white rounded-full border-2 border-black/10"></div>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 text-center p-6 space-y-4">
                                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                                                    <Camera className="w-10 h-10 text-gray-400" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-gray-900 mb-1">Camera Access</h5>
                                                    <p className="text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">We need to capture your face to verify your identity.</p>
                                                </div>
                                                <button
                                                    onClick={startCamera}
                                                    className="bg-[#111] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-black/80 transition-all flex items-center gap-2 shadow-lg shadow-black/20"
                                                >
                                                    <Camera className="w-4 h-4" />
                                                    Open Camera
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                         
                            {step === 4 && (
                                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                                     <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                            <Check size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Review & Submit</h4>
                                            <p className="text-sm text-gray-500">Please verify all information is correct.</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
                                        <div className="flex justify-between border-b border-gray-200 pb-3">
                                            <span className="text-gray-500 text-sm font-medium">Full Name</span>
                                            <span className="font-bold text-gray-900">{formData.firstName} {formData.lastName}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 pb-3">
                                            <span className="text-gray-500 text-sm font-medium">National ID</span>
                                            <span className="font-bold text-gray-900">{formData.nationalId}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-1">
                                            <span className="text-gray-500 text-sm font-medium">Documents</span>
                                            <div className="flex gap-2">
                                                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden ring-2 ring-white shadow-sm">
                                                    <img src={formData.idCardImage} className="w-full h-full object-cover" alt="ID" />
                                                </div>
                                                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden ring-2 ring-white shadow-sm">
                                                    <img src={formData.selfieImage} className="w-full h-full object-cover transform scale-x-[-1]" alt="Selfie" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-center text-gray-400 leading-relaxed px-4">
                                        By clicking submit, you confirm that the information provided is accurate and you agree to our processing of your biometric data.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
     
                {!isSubmitted && (
                    <div className="p-6 border-t border-gray-100 bg-white z-10">
                        <div className="flex gap-3">
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    disabled={isSubmitting}
                                    className="px-6 py-3.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={step === 4 ? handleSubmit : nextStep}
                                disabled={!canProceed() || isSubmitting}
                                className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                                    canProceed() && !isSubmitting
                                    ? 'bg-[#111] hover:bg-black/80 shadow-black/20' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        {step === 4 ? 'Submit Verification' : 'Continue'}
                                        {step !== 4 && <ChevronRight size={18} />}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default KycModal;