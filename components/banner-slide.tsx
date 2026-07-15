import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample banner data - คุณสามารถเปลี่ยนเป็นรูปภาพของคุณได้
  const banners = [
    {
      id: 1,
      title: "",
      subtitle: "",
      image: "/images/banner1.png",
      imageMb: "/images/banner1.png",
      gradient: "bg-black/30",
    },
    {
      id: 2,
      title: "ร้านของเราตั้งอยู่ในจังหวัดชลบุรี พร้อมให้บริการครอบคลุมพื้นที่พัทยา ศรีราชา บางละมุง สัตหีบ และพื้นที่ใกล้เคียง",
      subtitle: "ตรวจสอบและประเมินมูลค่าทอง เงิน หรือของมีค่าอื่น ๆ ได้ฟรี ไม่มีค่าใช้จ่ายใด ๆ เรามีทีมงานมืออาชีพพร้อมเครื่องมือมาตรฐานในการตรวจเช็ค และให้คำแนะนำอย่างเป็นกันเอง มั่นใจได้ในเรื่องความโปร่งใส และให้ราคายุติธรรมทุกชิ้น",
      image: "/images/banner2.png",
      imageMb: "/images/banner2.png",
      gradient: "bg-black/30",
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: any) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-52 sm:h-80 lg:h-[500px] overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg transition-all duration-300"
        style={{ backgroundImage: `url(${banners[currentSlide].image})` }}
      />
      <div className="relative w-full h-full max-w-screen-xl mx-auto">
        {/* Banner Container */}
        <div className="relative w-full h-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
                }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
                style={{ backgroundImage: `url(${banner.imageMb})` }}
              />

              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat max-lg:hidden"
                style={{ backgroundImage: `url(${banner.image})` }}
              />

              {/* <Image width={1300} height={500} src="/images/jk-banner.jpg" alt="banner"/> */}

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 ${banner.gradient}`} />

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center md:justify-end h-full text-white">
                <div className="text-center md:text-right max-w-xl px-6">
                  <h1 className="text-sm md:text-3xl font-bold  tracking-tight">
                    <span className="block opacity-0 animate-[slideUp_0.8s_ease-out_0.3s_forwards] bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent">
                      {banner.title}
                    </span>
                  </h1>
                  <p className="text-xs font-light opacity-90  animate-[slideUp_0.8s_ease-out_0.6s_forwards]">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 border  border-white/10 backdrop-blur-xs hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              disabled={isAnimating}
            >
              <ChevronLeft size={18} />
            </button>
          </>
        )}

        {banners.length > 1 && (
          <>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 border border-white/10 backdrop-blur-xs hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              disabled={isAnimating}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
                }`}
            />
          ))}
        </div>

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent flex items-end">
        <div className=" flex w-auto rounded-full">
          <Marquee className=" text-sm" pauseOnHover pauseOnClick>
            <span className="font-bold  text-sm ml-3 bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent">
              🟢 วิธีคำนวนราคาทอง ราคาทองวันนี้ x 0.0656 x (% ทองจริง x
              น้ำหนักทอง) = ราคาทองที่จะได้รับ พิกัด:พัทยาใต้ ซอยข้างบิ๊กซีพัทยาใต้
              ติดโรงเรียนสอนภาษาซูซู อ.บางละมุง จ.ชลบุรี
              เวลาทำการ 10.00-20.00 น. ทุกวัน 0928251259 Line:acar12
            </span>
          </Marquee>
        </div>
      </div>
    </div>
  );
};
