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
} from '../assets/images';

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

const tourDetailContentById = {
  1: {
    title: 'Du thuyền di sản Vịnh Hạ Long - Lan Hạ',
    destination: 'Vịnh Hạ Long',
    duration: '2 ngày 1 đêm',
    transport: 'Du thuyền 5 sao',
    badge: 'Bán chạy',
    imageAlt: 'Vịnh Hạ Long lúc bình minh',
    eyebrow: 'Hành trình di sản',
    season: 'Tháng 9 - tháng 4',
    groupSize: 'Tối đa 24 khách',
    departureNote: 'Thứ 5 và Thứ 7',
    departureSchedule: 'Khởi hành từ Hà Nội lúc 07:30',
    meetingPoint: 'Khu phố cổ Hà Nội hoặc bến tàu Tuần Châu',
    longDescription:
      'Một hành trình chậm trên mặt nước di sản, nơi thời gian được căn lại để bạn nghe được cả tiếng nước, gió và nhịp sinh hoạt trên boong tàu 5 sao.',
    curatorNote:
      'Tour này hợp với nhóm khách muốn có một kỳ nghỉ ngắn nhưng vẫn đủ độ sâu. Khung cảnh đẹp nhất đến vào lúc sớm và lúc chiều muộn, khi mặt nước chẳng còn ồn ào.',
    curatorName: 'Linh Nguyễn, ADN Curator',
    overviewCards: [
      {
        icon: 'bed',
        title: 'Du thuyền 5 sao trên vịnh',
        description:
          'Khoang nghỉ riêng, cửa sổ rộng và boong tàu mở để bạn thật sự sống trong cảnh quan thay vì chỉ đi qua.',
      },
      {
        icon: 'kayaking',
        title: 'Hoạt động cân bằng',
        description:
          'Chèo kayak, tham quan hang, thử lớp nấu ăn và khoảng nghỉ tự do để chuyến đi không bị gấp rút.',
      },
      {
        icon: 'restaurant',
        title: 'Ẩm thực trên boong',
        description:
          'Menu theo mùa với hải sản địa phương, bữa tối set-menu và bữa sáng nhẹ trước khi trở lại bến.',
      },
    ],
    highlights: [
      {
        icon: 'water',
        title: 'Lan Hạ trong góc nhìn yên hơn',
        description: 'Tuyến được sắp xếp để bạn có nhiều khoảng lặng và điểm dừng có chọn lọc hơn so với tour đại trà.',
      },
      {
        icon: 'photo_camera',
        title: 'Khoảnh khắc bình minh và hoàng hôn',
        description: 'Boong tàu trên cùng và lịch trình đổi nhịp theo ánh sáng giúp bạn có frame đẹp mà không cần vội vàng.',
      },
      {
        icon: 'spa',
        title: 'Nghỉ ít nhưng đủ chất',
        description: 'Mỗi hoạt động được chia nhiệt độ hợp lý để hành trình 2 ngày 1 đêm vẫn có cảm giác đầy đặn.',
      },
    ],
    itinerary: [
      {
        label: 'Ngày 1',
        title: 'Hà Nội - bến tàu - check-in du thuyền',
        description:
          'Đón khách từ sáng, lên tàu vào buổi trưa, nhận phòng, dùng bữa trưa trên hành trình và bắt đầu chuỗi trải nghiệm kayak, tham hang và sunset canape.',
      },
      {
        label: 'Ngày 2',
        title: 'Thái cực buổi sáng - brunch - trở về',
        description:
          'Khởi động nhẹ trên boong tàu, thăm điểm cuối bằng thuyền nan, ăn brunch và quay lại bến tàu trước giờ trưa.',
      },
    ],
    includedItems: [
      'Xe đón trả 2 chiều từ Hà Nội',
      '1 đêm phòng riêng trên du thuyền',
      'Bữa trưa, bữa tối, brunch và trà chiều',
      'Vé tham quan và kayak theo lịch trình',
    ],
    promiseItems: [
      'Tư vấn riêng để chọn hạng phòng và tầng boong',
      'Có thể bổ sung kỷ niệm ngày cuối tuần hoặc honeymoon setup',
      'Hỗ trợ đổi lịch nếu thời tiết trên vịnh thay đổi',
    ],
  },
  2: {
    title: 'Hành trình miền Trung: Đà Nẵng - Hội An',
    destination: 'Đà Nẵng & Hội An',
    duration: '4 ngày 3 đêm',
    transport: 'Máy bay + xe đưa đón',
    badge: 'Mới',
    imageAlt: 'Cầu Vàng tại Bà Nà Hills',
    eyebrow: 'Tuyến miền Trung tiêu biểu',
    season: 'Quanh năm, đẹp nhất tháng 2 - 8',
    groupSize: 'Tối đa 16 khách',
    departureNote: 'Thứ 6 hằng tuần',
    departureSchedule: 'Bay sáng thứ 6, trở về tối thứ 2',
    meetingPoint: 'Sân bay Đà Nẵng hoặc điểm hẹn trong thành phố',
    longDescription:
      'Một tuyến miền Trung được cắt may theo nhịp nhanh và nhịp chậm: bạn có Đà Nẵng rộng mở và Hội An lắng một trong cùng một hành trình.',
    curatorNote:
      'Đây là dạng tour rất hợp cho cặp đôi và nhóm bạn nhỏ. Điểm hay là sự đối lập giữa khoảng sáng tạo của Đà Nẵng và chất lắng của Hội An về đêm.',
    curatorName: 'Hoàng Trần, ADN Curator',
    overviewCards: [
      {
        icon: 'flight_takeoff',
        title: 'Bay thẳng, vào việc nhanh',
        description:
          'Lịch bay được canh để tối ưu 4 ngày 3 đêm, giảm thời gian chờ đợi và tăng thời gian trải nghiệm thật sự.',
      },
      {
        icon: 'nightlife',
        title: '2 nhiệt độ trong 1 hành trình',
        description:
          'Ngày rộng và sáng ở Đà Nẵng, tối ấm và có chiều sâu ở Hội An, giúp tour có tiết tấu rất dễ chịu.',
      },
      {
        icon: 'local_dining',
        title: 'Ăn theo tinh thần địa phương',
        description:
          'Mì Quảng, cao lầu, cafe roastery và một bữa tối rooftop được đề xuất để giữ màu cảm xúc của tuyến.',
      },
    ],
    highlights: [
      {
        icon: 'landscape',
        title: 'Bà Nà và cung đường view mở',
        description: 'Có thể linh hoạt giữa lịch city tour, biển hoặc đồi núi tuỳ theo nhóm khách mục tiêu.',
      },
      {
        icon: 'architecture',
        title: 'Hội An lên đèn vào buổi tối',
        description: 'Khung giờ được canh để phố cổ lên đèn đúng lúc, đẹp và dễ chụp nhất.',
      },
      {
        icon: 'storefront',
        title: 'Chèn các điểm dừng có chất',
        description: 'Không nhồi quá nhiều điểm check-in. Mỗi điểm được giữ đủ thời gian để trải nghiệm có độ sâu.',
      },
    ],
    itinerary: [
      {
        label: 'Ngày 1',
        title: 'Đà Nẵng chào khách bằng một nhịp độ nhẹ',
        description:
          'Đón sân bay, nghỉ trưa, city orientation, rooftop sunset và bữa tối không quá nặng để giữ năng lượng cho ngày tiếp theo.',
      },
      {
        label: 'Ngày 2',
        title: 'Bà Nà hoặc tuyến biển linh hoạt',
        description:
          'Tuỳ mục tiêu sản phẩm, ngày này có thể là Bà Nà Hills, Sơn Trà - Mỹ Khê hoặc luxury free-time cho nhóm nghỉ dưỡng.',
      },
      {
        label: 'Ngày 3',
        title: 'Hội An lên nhịp',
        description:
          'Về phố cổ, thăm nhà cổ, workshop nhỏ, ăn chiều sớm và giữ khung 17:00 - 20:30 cho trải nghiệm phố đèn lồng.',
      },
    ],
    includedItems: [
      'Vé máy bay khứ hồi theo gói',
      'Khách sạn trung tâm Đà Nẵng / Hội An',
      'Xe đưa đón và hướng dẫn viên theo lịch',
      'Một bữa tối signature và một workshop địa phương',
    ],
    promiseItems: [
      'Có thể tách thành version nghỉ dưỡng hoặc version check-in',
      'Dễ dàng thêm shooting, decor sinh nhật hoặc honeymoon setup',
      'Lịch trình linh hoạt theo giờ bay thực tế',
    ],
  },
  3: {
    title: 'Chinh phục đỉnh Fansipan - Sapa đại ngàn',
    destination: 'Sapa',
    duration: '3 ngày 2 đêm',
    transport: 'Tàu hỏa cao cấp',
    badge: 'Khám phá',
    imageAlt: 'Ruộng bậc thang Sapa xanh mướt',
    eyebrow: 'Thoát khỏi phố, chạm núi',
    season: 'Tháng 9 - tháng 4',
    groupSize: 'Tối đa 18 khách',
    departureNote: 'Khởi hành thứ 5',
    departureSchedule: 'Đêm thứ 5 từ Hà Nội, sáng thứ 6 ở Lào Cai',
    meetingPoint: 'Ga Hà Nội hoặc điểm hẹn trung tâm',
    longDescription:
      'Hành trình này không chỉ để săn mây. Đây là một chuyến đi lên núi có tiết tấu đẹp, đủ khoảng cho trải nghiệm văn hoá và những frame rộng của Tây Bắc.',
    curatorNote:
      'Nếu muốn một tour ngắm núi không quá gắt, đây là câu trả lời rất cân bằng. Fansipan là điểm đầy cảm xúc, nhưng không làm lu mờ phần văn hoá bản địa.',
    curatorName: 'Minh Phan, ADN Curator',
    overviewCards: [
      {
        icon: 'tram',
        title: 'Tàu đêm giữ chất hành trình',
        description:
          'Đi tàu giúp chuyến đi có tính chuyển hoá rất rõ: rời thành phố vào đêm và mở mắt trong một khung cảnh khác.',
      },
      {
        icon: 'terrain',
        title: 'Cân bằng giữa trekking và nghỉ',
        description:
          'Không đẩy lịch quá mạnh. Tour được giữ ở mức trải nghiệm vừa đủ cho nhóm khách mong muốn thử sức.',
      },
      {
        icon: 'festival',
        title: 'Chạm văn hoá địa phương',
        description:
          'Chợ phiên, bản làng và khoảng ăn nóng là phần làm cho chuyến đi có trí nhớ sâu hơn một buổi săn mây.',
      },
    ],
    highlights: [
      {
        icon: 'wb_twilight',
        title: 'Khung giờ săn mây có chọn lọc',
        description: 'Lịch được canh theo dựa thay đổi thời tiết để tăng khả năng gặp biển mây đẹp.',
      },
      {
        icon: 'hiking',
        title: 'Độ khó vừa phải',
        description: 'Tour hợp với người muốn có cái chất adventure nhưng vẫn cần dịch vụ chăm sóc ổn định.',
      },
      {
        icon: 'cottage',
        title: 'Đêm núi ấm và có nhịp',
        description: 'Phần lưu trú và bữa tối được chọn để giữ cảm giác ấm áp sau một ngày đi nhiều.',
      },
    ],
    itinerary: [
      {
        label: 'Ngày 1',
        title: 'Lên núi, vào không khí Sapa',
        description:
          'Đến Sapa, ăn sáng nhẹ, nghỉ khoảng ngắn, sau đó bắt đầu tuyến khám phá bản địa và độ cao để có nhịp chuyển cảnh.',
      },
      {
        label: 'Ngày 2',
        title: 'Fansipan và những khung nhìn rộng',
        description:
          'Lên cáp treo hoặc mix cùng trekking nhẹ, canh khung giờ tốt cho mây, sau đó quay về thị trấn thư giãn và ăn tối.',
      },
      {
        label: 'Ngày 3',
        title: 'Chợ phiên - trở về',
        description:
          'Thêm một điểm chạm văn hoá bản địa buổi sáng trước khi lên đường trở lại Hà Nội.',
      },
    ],
    includedItems: [
      'Tàu đêm hoặc xe limousine tuỳ gói',
      'Khách sạn view núi trung tâm Sapa',
      'Vé cáp treo / combo lên Fansipan theo gói',
      'Hướng dẫn viên và bữa ăn theo lịch',
    ],
    promiseItems: [
      'Có thể mở rộng thành phiên bản trekking sâu hơn',
      'Linh hoạt theo thời tiết để giữ trải nghiệm đẹp nhất',
      'Phù hợp cho nhóm bạn và công ty nhỏ cần retreat ngắn',
    ],
  },
  4: {
    title: 'Huế - vẻ đẹp cố đô & ẩm thực cung đình',
    destination: 'Huế',
    duration: '3 ngày 2 đêm',
    transport: 'Ẩm thực trọn gói',
    badge: 'Tinh tuyển',
    imageAlt: 'Đại Nội Huế phản chiếu bên hồ nước',
    eyebrow: 'Hành trình văn hoá và ẩm thực',
    season: 'Tháng 1 - tháng 8',
    groupSize: 'Tối đa 14 khách',
    departureNote: 'Thứ 6 và Chủ nhật',
    departureSchedule: 'Khởi hành sớm từ Đà Nẵng hoặc Hà Nội',
    meetingPoint: 'Sân bay Phú Bài / trung tâm Huế',
    longDescription:
      'Đây là detail tour dẫn nhạc bởi màu sắc cố đô, ẩm thực cung đình và những khoảng đi chậm. Huế không được xem như một điểm stop, mà là một nhiệt độ riêng cần được ngắm kỹ.',
    curatorNote:
      'Huế đẹp khi bạn cho nó đủ độ sâu. Chúng tôi không đẩy lịch quá dày, thay vào đó giữ khoảng cho Đại Nội, ẩm thực và những cuộc tản bộ để thành phố tự mở mình.',
    curatorName: 'Lan Anh, ADN Curator',
    overviewCards: [
      {
        icon: 'castle',
        title: 'Cố đô trong một nhịp đi chậm',
        description:
          'Lịch trình để khoảng cho bạn ngắm Huế bằng cả mắt và tai, không chỉ check-in nhanh qua các công trình.',
      },
      {
        icon: 'ramen_dining',
        title: 'Ẩm thực là một cột trụ',
        description:
          'Hành trình ăn uống được đặt ngang hàng với tham quan, từ món cung đình đến quán nhà nhỏ có chất riêng.',
      },
      {
        icon: 'self_improvement',
        title: 'Nhẹ nhàng mà giàu chất liệu',
        description:
          'Phù hợp với cặp đôi, gia đình nhỏ hoặc nhóm muốn một chuyến đi có tính thưởng thức hơn là chạy đua điểm đến.',
      },
    ],
    highlights: [
      {
        icon: 'account_balance',
        title: 'Đại Nội và những lớp lịch sử',
        description: 'Được canh giờ để tránh đông, giữ nhịp tham quan thong dong và dễ nghe câu chuyện tốt hơn.',
      },
      {
        icon: 'restaurant',
        title: 'Bàn ăn Huế có chủ đề',
        description: 'Từ bữa sáng dân dã đến bữa tối chỉn chu hơn, tour có cột ẩm thực rõ nét thay vì chỉ ghé ngẫu nhiên.',
      },
      {
        icon: 'directions_walk',
        title: 'Thành phố hợp để đi bộ',
        description: 'Nhiều đoạn được thiết kế cho tản bộ ngắn để cảm nhận Huế bằng nhịp thời gian thật.',
      },
    ],
    itinerary: [
      {
        label: 'Ngày 1',
        title: 'Vào Huế và cân nhiệt độ',
        description:
          'Check-in, ăn trưa nhẹ, đi một vòng mở nhãn thành phố và bắt đầu bằng một điểm đến để vào không khí Huế thật tự nhiên.',
      },
      {
        label: 'Ngày 2',
        title: 'Đại Nội - lăng tẩm - bữa tối theo concept',
        description:
          'Ngày cột sống của hành trình: tham quan di sản, chèn điểm nghỉ, sau đó khớp lại bằng bữa tối có tính trình diễn ẩm thực.',
      },
      {
        label: 'Ngày 3',
        title: 'Cà phê sáng, mua quà, kết tour',
        description:
          'Giữ một buổi sáng nhẹ để thành phố đóng lại đẹp trước khi khách rời Huế.',
      },
    ],
    includedItems: [
      'Lưu trú trung tâm Huế',
      'Xe đưa đón và hướng dẫn suốt tuyến',
      'Vé vào cổng di sản và một bữa tối signature',
      'Danh sách điểm ăn và cafe đề xuất theo concept',
    ],
    promiseItems: [
      'Có thể nâng cấp thành tour couple hoặc tour family heritage',
      'Phù hợp nhóm khách yêu ẩm thực và kiến trúc',
      'Rất dễ mở rộng sang combo Huế - Đà Nẵng - Hội An',
    ],
  },
};

export function getTourById(tourId) {
  const baseTour = toursContent.tours.find((tour) => String(tour.id) === String(tourId));

  if (!baseTour) {
    return null;
  }

  return {
    ...baseTour,
    ...tourDetailContentById[baseTour.id],
  };
}

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
