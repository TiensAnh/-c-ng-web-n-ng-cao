import {
  aboutCtaImage,
  aboutHeroImage,
  aboutMissionImage,
  aboutWhyChooseImage,
  contactMapImage,
  contactNewsletterImage,
  homeHeroImage,
  homeNewsletterImage,
  promoFlightImage,
  promoHotelImage,
  teamHoangImage,
  teamLinhImage,
  teamMinhImage,
  tourDanangImage,
  tourHalongImage,
  tourHueImage,
  tourSapaImage,
  toursPromoImage,
} from '../../assets/images';

export const navigationLinks = [
  { label: 'Điểm đến', path: '/' },
  { label: 'Tours', path: '/tours' },
  { label: 'Về ADN', path: '/about' },
  { label: 'Liên hệ', path: '/contact' },
];

export const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Help Center', href: '#' },
  { label: 'Cookies', href: '#' },
];

export const homeContent = {
  hero: {
    image: homeHeroImage,
    eyebrow: 'ADN Travel',
    title: ['Du lịch dễ dàng', 'khắp mọi nơi'],
    description:
      'Khám phá những điểm đến mơ ước với dịch vụ cá nhân hóa và ưu đãi độc quyền từ ADN Travel.',
  },
  promotions: {
    title: 'Dành riêng cho người mới',
    description: 'Bắt đầu hành trình của bạn với những ưu đãi hấp dẫn nhất.',
    items: [
      {
        badge: 'Mới giảm 20%',
        title: 'Chuyến bay đầu tiên',
        description: 'Nhập mã WELCOME20 để được giảm trực tiếp cho các hành trình quốc tế.',
        buttonLabel: 'Nhận mã ngay',
        image: promoFlightImage,
        imageAlt: 'Cánh máy bay trên nền bầu trời xanh',
      },
      {
        badge: 'Ưu đãi khách sạn',
        title: 'Giảm 500k cho đêm đầu',
        description: 'Áp dụng cho tất cả khách sạn 4-5 sao tại Việt Nam.',
        buttonLabel: 'Đặt ngay',
        image: promoHotelImage,
        imageAlt: 'Phòng khách sạn cao cấp với view biển',
      },
    ],
    features: [
      {
        icon: 'verified',
        title: 'Đảm bảo giá tốt nhất',
        description: 'Hoàn tiền chênh lệch nếu bạn tìm thấy giá ưu đãi hơn ở nơi khác.',
        tone: 'blue',
      },
      {
        icon: 'support_agent',
        title: 'Hỗ trợ 24/7',
        description: 'Đội ngũ chuyên viên luôn sẵn sàng giúp đỡ bạn trong mọi hành trình.',
        tone: 'gold',
      },
      {
        icon: 'loyalty',
        title: 'Tích lũy dặm bay',
        description: 'Nhận điểm thưởng cho mỗi giao dịch và đổi lấy những chuyến đi miễn phí.',
        tone: 'neutral',
      },
    ],
  },
  newsletter: {
    title: 'Nhận thông tin ưu đãi bí mật',
    description:
      'Đăng ký bản tin của chúng tôi để không bỏ lỡ những chuyến đi mơ ước với mức giá không tưởng.',
    image: homeNewsletterImage,
    imageAlt: 'Du khách đeo balo trên phố châu Âu',
  },
};

export const toursContent = {
  destinations: ['Vịnh Hạ Long', 'Đà Nẵng & Hội An', 'Sapa', 'Huế'],
  durationOptions: ['1-3 ngày', '4-7 ngày', 'Trên 1 tuần'],
  ratingOptions: [
    { label: '5.0', value: '5' },
    { label: 'Trở lên', value: '4' },
  ],
  sidebarPromo: {
    image: toursPromoImage,
    title: 'Khám phá thiên đường Phú Quốc',
    description: 'Giảm ngay 20% cho nhóm trên 4 người.',
  },
  tours: [
    {
      id: 1,
      title: 'Du thuyền di sản Vịnh Hạ Long - Lan Hạ',
      destination: 'Vịnh Hạ Long',
      description:
        'Khám phá vẻ đẹp hùng vĩ của di sản thiên nhiên thế giới trên du thuyền 5 sao đẳng cấp.',
      duration: '2 Ngày 1 Đêm',
      durationGroup: '1-3 ngày',
      transport: 'Tối đa 24 khách',
      price: 3550000,
      rating: 4.9,
      reviews: '1.2k',
      popularity: 98,
      badge: 'Bán chạy',
      image: tourHalongImage,
      imageAlt: 'Vịnh Hạ Long lúc bình minh',
    },
    {
      id: 2,
      title: 'Hành trình miền Trung: Đà Nẵng - Hội An',
      destination: 'Đà Nẵng & Hội An',
      description:
        'Trải nghiệm nét cổ kính của phố cổ Hội An và sự hiện đại năng động của Đà Nẵng.',
      duration: '4 Ngày 3 Đêm',
      durationGroup: '4-7 ngày',
      transport: 'Bao gồm vé máy bay',
      price: 6290000,
      rating: 4.8,
      reviews: '850',
      popularity: 96,
      badge: 'Mới',
      image: tourDanangImage,
      imageAlt: 'Cầu Vàng tại Bà Nà Hills',
    },
    {
      id: 3,
      title: 'Chinh phục đỉnh Fansipan - Sapa Đại Ngàn',
      destination: 'Sapa',
      description:
        'Săn mây trên nóc nhà Đông Dương và tìm hiểu văn hóa bản địa độc đáo của vùng cao phía Bắc.',
      duration: '3 Ngày 2 Đêm',
      durationGroup: '1-3 ngày',
      transport: 'Tàu hỏa cao cấp',
      price: 2850000,
      rating: 4.7,
      reviews: '520',
      popularity: 90,
      badge: '',
      image: tourSapaImage,
      imageAlt: 'Ruộng bậc thang Sapa xanh mướt',
    },
    {
      id: 4,
      title: 'Huế - Vẻ đẹp Cố đô & Ẩm thực Cung đình',
      destination: 'Huế',
      description:
        'Trở về lịch sử với Đại Nội kinh thành và thưởng thức những tinh túy ẩm thực của triều Nguyễn.',
      duration: '3 Ngày 2 Đêm',
      durationGroup: '1-3 ngày',
      transport: 'All-inclusive Dining',
      price: 4100000,
      rating: 4.9,
      reviews: '340',
      popularity: 92,
      badge: '',
      image: tourHueImage,
      imageAlt: 'Đại Nội Huế phản chiếu bên hồ nước',
    },
  ],
};

export const aboutContent = {
  hero: {
    image: aboutHeroImage,
    eyebrow: 'Về ADN Travel',
    title: ['Hành Trình Kiến Tạo', 'Chân Trời Mới.'],
    description:
      'Chúng tôi không chỉ cung cấp dịch vụ du lịch, chúng tôi kiến tạo những trải nghiệm mang tính biểu tượng kết nối tâm hồn bạn với những vùng đất xa xôi nhất.',
  },
  mission: {
    title: 'Sứ Mệnh Của Chúng Tôi',
    description:
      'Thay đổi cách con người khám phá thế giới thông qua sự kết hợp hài hòa giữa công nghệ hiện đại và dịch vụ cá nhân hóa cao cấp.',
    image: aboutMissionImage,
  },
  values: [
    {
      icon: 'verified_user',
      title: 'Tin Cậy',
      description: 'Cam kết chất lượng chuẩn quốc tế trong mọi giao dịch.',
    },
    {
      icon: 'auto_awesome',
      title: 'Đột Phá',
      description: 'Luôn tiên phong trong các xu hướng du lịch bền vững.',
    },
  ],
  whyChoose: {
    title: 'Tại sao chọn ADN Travel?',
    image: aboutWhyChooseImage,
    score: '98%',
    scoreDescription: 'Khách hàng hài lòng với dịch vụ tư vấn hành trình cá nhân hóa của chúng tôi.',
    items: [
      {
        icon: 'curtains',
        title: 'Đặc Quyền Riêng Tư',
        description: 'Truy cập vào các điểm đến ẩn giấu và những trải nghiệm không đại trà.',
      },
      {
        icon: 'support_agent',
        title: 'Hỗ Trợ Toàn Cầu 24/7',
        description: 'Bất kể bạn ở múi giờ nào, đội ngũ concierge luôn sẵn sàng hỗ trợ.',
      },
      {
        icon: 'eco',
        title: 'Du Lịch Bền Vững',
        description: 'Mỗi chuyến đi đều góp phần bảo tồn văn hóa và môi trường tại địa phương.',
      },
    ],
  },
  stats: [
    { value: '12+', label: 'Năm kinh nghiệm' },
    { value: '150k', label: 'Chuyến đi thành công' },
    { value: '85', label: 'Đối tác khách sạn 5*' },
    { value: '25', label: 'Giải thưởng quốc tế' },
  ],
  team: [
    {
      name: 'Minh Phan',
      role: 'Founder & CEO',
      description: 'Người định hình ADN Travel với tầm nhìn tái định nghĩa du lịch cao cấp tại Việt Nam.',
      image: teamMinhImage,
    },
    {
      name: 'Linh Nguyễn',
      role: 'Giám đốc Trải nghiệm',
      description: 'Trực tiếp thiết kế những tour độc bản dành riêng cho khách hàng yêu sự tinh tế.',
      image: teamLinhImage,
    },
    {
      name: 'Hoàng Trần',
      role: 'Trưởng bộ phận đối ngoại',
      description: 'Kết nối mạng lưới khách sạn, hãng bay và đối tác cao cấp trên toàn cầu.',
      image: teamHoangImage,
    },
  ],
  cta: {
    image: aboutCtaImage,
    title: 'Sẵn sàng để viết nên câu chuyện của riêng bạn?',
    primaryLabel: 'Bắt đầu chuyến đi',
    secondaryLabel: 'Liên hệ tư vấn',
  },
};

export const contactContent = {
  hero: {
    eyebrow: 'Liên hệ với chúng tôi',
    title: 'Chúng tôi luôn lắng nghe bạn',
    description:
      'Dù bạn có thắc mắc về chuyến đi tiếp theo hay muốn chia sẻ trải nghiệm, đội ngũ ADN Travel luôn sẵn sàng hỗ trợ.',
  },
  information: [
    {
      icon: 'location_on',
      title: 'Trụ sở chính',
      description: 'Tòa nhà ADN, 123 Đường Lê Lợi, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
    },
    {
      icon: 'call',
      title: 'Điện thoại',
      description: '+84 (28) 3822 4567',
    },
    {
      icon: 'mail',
      title: 'Email',
      description: 'support@adntravel.vn',
    },
  ],
  mapCard: {
    image: contactMapImage,
    buttonLabel: 'Xem bản đồ chi tiết',
  },
  faqs: [
    {
      question: 'Làm thế nào để thay đổi lịch trình chuyến đi?',
      answer:
        'Bạn có thể liên hệ trực tiếp concierge của ADN Travel trước ngày khởi hành để được hỗ trợ điều chỉnh lịch trình phù hợp.',
    },
    {
      question: 'Chính sách hoàn tiền của ADN Travel như thế nào?',
      answer:
        'Chính sách hoàn tiền phụ thuộc từng gói dịch vụ, nhưng mọi điều khoản luôn được gửi rõ ràng trước khi xác nhận đặt tour.',
    },
    {
      question: 'Tôi có thể đặt dịch vụ concierge trực tiếp không?',
      answer:
        'Có. ADN Travel cung cấp cả gói concierge độc lập cho khách hàng cần hỗ trợ riêng về di chuyển, lưu trú và trải nghiệm.',
    },
    {
      question: 'ADN Travel có hỗ trợ đặt tour cho nhóm lớn không?',
      answer:
        'Chúng tôi có đội ngũ chuyên trách cho doanh nghiệp, gia đình đông thành viên và các đoàn khách VIP cần hành trình tùy chỉnh.',
    },
  ],
  newsletter: {
    title: 'Nhận những ưu đãi độc quyền hàng tuần',
    description:
      'Tham gia cộng đồng Explorer để không bỏ lỡ bất kỳ hành trình mơ ước nào với ưu đãi đặc biệt.',
    image: contactNewsletterImage,
  },
};

export async function subscribeToNewsletter({ email, source }) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    success: true,
    message: `ADN Travel đã lưu email ${email} cho mục ${source}.`,
  };
}

export async function submitContactForm() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: 'Cảm ơn bạn đã để lại lời nhắn. ADN Travel sẽ phản hồi trong vòng 24 giờ làm việc.',
  };
}
