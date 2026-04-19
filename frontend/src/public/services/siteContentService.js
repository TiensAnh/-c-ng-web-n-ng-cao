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
    eyebrow: 'Heritage voyage',
    season: 'Thang 9 - thang 4',
    groupSize: 'Toi da 24 khach',
    departureNote: 'Thu 5 va Thu 7',
    departureSchedule: 'Khoi hanh tu Ha Noi luc 07:30',
    meetingPoint: 'Khu pho co Ha Noi hoac ben Tau Tuan Chau',
    longDescription:
      'Mot hanh trinh cham tren mat nuoc di san, noi thoi gian duoc can lai de ban nghe duoc ca tieng nuoc, gio va nhip sinh hoat tren boong tau 5 sao.',
    curatorNote:
      'Tour nay hop voi nhom khach muon co mot ky nghi ngan nhung van du do sau. Khung canh dep nhat den vao luc som va luc chieu muon, khi mat nuoc chang con on ao.',
    curatorName: 'Linh Nguyen, ADN Curator',
    overviewCards: [
      {
        icon: 'bed',
        title: 'Du thuyen 5 sao tren vinh',
        description:
          'Khoang nghi rieng, cua so rong va boong tau mo de ban that su song trong canh quan thay vi chi di qua.',
      },
      {
        icon: 'kayaking',
        title: 'Hoat dong can bang',
        description:
          'Cheo kayak, tham quan hang, thu lop nau an va khoang nghi tu do de chuyen di khong bi gap rut.',
      },
      {
        icon: 'restaurant',
        title: 'Am thuc tren boong',
        description:
          'Menu theo mua voi hai san dia phuong, bua toi set-menu va bua sang nhe truoc khi tro lai ben.',
      },
    ],
    highlights: [
      {
        icon: 'water',
        title: 'Lan Ha trong goc nhin yen hon',
        description: 'Tuyen duoc sap xep de ban co nhieu khoang lang va diem dung co chon loc hon so voi tour dai tra.',
      },
      {
        icon: 'photo_camera',
        title: 'Khoang anh binh minh va hoang hon',
        description: 'Boong tau tren cung va lich trinh doi nhip theo anh sang giup ban co frame dep ma khong can voi vang.',
      },
      {
        icon: 'spa',
        title: 'Nghi it nhung dung chat',
        description: 'Moi hoat dong duoc chia nhiet do hop ly de hanh trinh 2 ngay 1 dem van co cam giac day dan.',
      },
    ],
    itinerary: [
      {
        label: 'Ngay 1',
        title: 'Ha Noi - ben tau - check-in du thuyen',
        description:
          'Don khach tu sang, len tau vao buoi trua, nhan phong, dung bua trua tren hanh trinh va bat dau chuoi trai nghiem kayak, tham hang va sunset canape.',
      },
      {
        label: 'Ngay 2',
        title: 'Thai cuc buoi sang - brunch - tro ve',
        description:
          'Khoi dong nhe tren boong tau, tham diem cuoi bang thuyen nan, an brunch va quay lai ben tau truoc gio trua.',
      },
    ],
    includedItems: [
      'Xe don tra 2 chieu tu Ha Noi',
      '1 dem phong rieng tren du thuyen',
      'Bua trua, bua toi, brunch va tra chieu',
      'Ve tham quan va kayak theo lich trinh',
    ],
    promiseItems: [
      'Tu van rieng de chon hang phong va tang boong',
      'Co the bo sung ky niem ngay cuoi tuan hoac honeymoon setup',
      'Ho tro doi lich neu thoi tiet tren vinh thay doi',
    ],
  },
  2: {
    eyebrow: 'Central signature route',
    season: 'Quanh nam, dep nhat thang 2 - 8',
    groupSize: 'Toi da 16 khach',
    departureNote: 'Thu 6 hang tuan',
    departureSchedule: 'Bay sang thu 6, tro ve toi thu 2',
    meetingPoint: 'San bay Da Nang hoac diem hen trong thanh pho',
    longDescription:
      'Mot tuyen mien Trung duoc cat may theo nhiep nhanh va nhiep cham: ban co Da Nang rong mo va Hoi An lang mot trong cung mot hanh trinh.',
    curatorNote:
      'Day la dang tour rat hop cho cap doi va nhom ban nho. Diem hay la su doi lap giua khoang sang tao cua Da Nang va chat lang cua Hoi An ve dem.',
    curatorName: 'Hoang Tran, ADN Curator',
    overviewCards: [
      {
        icon: 'flight_takeoff',
        title: 'Bay thang, vao viec nhanh',
        description:
          'Lich bay duoc canh de toi uu 4 ngay 3 dem, giam thoi gian cho doi va tang thoi gian trai nghiem that su.',
      },
      {
        icon: 'nightlife',
        title: '2 nhiet do trong 1 hanh trinh',
        description:
          'Ngay rong va sang o Da Nang, toi am va co chieu sau o Hoi An, giup tour co tiet tau rat de chiu.',
      },
      {
        icon: 'local_dining',
        title: 'An theo tinh than dia phuong',
        description:
          'Mi Quang, cao lau, cafe roastery va mot bua toi rooftop duoc de xuat de giu mau cam xuc cua tuyen.',
      },
    ],
    highlights: [
      {
        icon: 'landscape',
        title: 'Ba Na va cung duong view mo',
        description: 'Co the linh hoat giua lich city tour, bien hoac doi nui tuy theo nhom khach muc tieu.',
      },
      {
        icon: 'architecture',
        title: 'Hoi An len den vao buoi toi',
        description: 'Khung gio duoc canh de pho co len den dung luc, dep va de chup nhat.',
      },
      {
        icon: 'storefront',
        title: 'Chen cac diem dung co chat',
        description: 'Khong nhoi qua nhieu diem check-in. Moi diem duoc giu du thoi gian de trai nghiem co do sau.',
      },
    ],
    itinerary: [
      {
        label: 'Ngay 1',
        title: 'Da Nang chao khach bang mot nhiep do nhe',
        description:
          'Don san bay, nghi trua, city orientation, rooftop sunset va bua toi khong qua nang de giu nang luong cho ngay tiep theo.',
      },
      {
        label: 'Ngay 2',
        title: 'Ba Na hoac tuyen bien linh hoat',
        description:
          'Tuy muc tieu san pham, ngay nay co the la Ba Na Hills, Son Tra - My Khe hoac luxury free-time cho nhom nghi duong.',
      },
      {
        label: 'Ngay 3',
        title: 'Hoi An len nhip',
        description:
          'Ve pho co, tham nha co, workshop nho, an chieu som va giu khung 17:00 - 20:30 cho trai nghiem pho den long den.',
      },
    ],
    includedItems: [
      'Ve may bay khu hoi theo goi',
      'Khach san trung tam Da Nang / Hoi An',
      'Xe dua don va huong dan vien theo lich',
      'Mot bua toi signature va mot workshop dia phuong',
    ],
    promiseItems: [
      'Co the tach thanh version nghi duong hoac version check-in',
      'De dang them shooting, decor sinh nhat hoac honeymoon setup',
      'Lich trinh linh hoat theo gio bay thuc te',
    ],
  },
  3: {
    eyebrow: 'Mountain escape',
    season: 'Thang 9 - thang 4',
    groupSize: 'Toi da 18 khach',
    departureNote: 'Khoi hanh thu 5',
    departureSchedule: 'Dem thu 5 tu Ha Noi, sang thu 6 o Lao Cai',
    meetingPoint: 'Ga Ha Noi hoac diem hen trung tam',
    longDescription:
      'Hanh trinh nay khong chi de san may. Day la mot chuyen di len nui co tiet tau dep, du khoang cho trai nghiem van hoa va nhung frame rong cua Tay Bac.',
    curatorNote:
      'Neu muon mot tour ngam nui khong qua rat, day la cau tra loi rat can bang. Fansipan la diem day cam xuc, nhung khong lam lu mo phan van hoa ban dia.',
    curatorName: 'Minh Phan, ADN Curator',
    overviewCards: [
      {
        icon: 'tram',
        title: 'Tau dem giu chat hanh trinh',
        description:
          'Di tau giup chuyen di co tinh chuyen hoa rat ro: roi thanh pho vao dem va mo mat trong mot khung canh khac.',
      },
      {
        icon: 'terrain',
        title: 'Can bang giua trekking va nghi',
        description:
          'Khong day lich qua manh. Tour duoc giu o muc trai nghiem vua du cho nhom khach mong muon thu suc.',
      },
      {
        icon: 'festival',
        title: 'Cham van hoa dia phuong',
        description:
          'Cho phien, ban lang va khoang an nong la phan lam cho chuyen di co tri nho sau hon mot buoi san may.',
      },
    ],
    highlights: [
      {
        icon: 'wb_twilight',
        title: 'Khung gio san may co chon loc',
        description: 'Lich duoc canh theo dua thay doi thoi tiet de tang kha nang gap bien may dep.',
      },
      {
        icon: 'hiking',
        title: 'Do kho vua phai',
        description: 'Tour hop voi nguoi muon co cai chat adventure nhung van can dich vu cham soc on dinh.',
      },
      {
        icon: 'cottage',
        title: 'Dem nui am va co nhip',
        description: 'Phan luu tru va bua toi duoc chon de giu cam giac am ap sau mot ngay di nhieu.',
      },
    ],
    itinerary: [
      {
        label: 'Ngay 1',
        title: 'Len nui, vao khong khi Sapa',
        description:
          'Den Sapa, an sang nhe, nghi khoang ngan, sau do bat dau tuyen kham pha ban dia va do cao de co nhiep chuyen can.',
      },
      {
        label: 'Ngay 2',
        title: 'Fansipan va nhung khung nhin rong',
        description:
          'Len cap treo hoac mix cung trekking nhe, canh khung gio tot cho may, sau do quay ve thi tran thu gian va an toi.',
      },
      {
        label: 'Ngay 3',
        title: 'Cho phien - tro ve',
        description:
          'Them mot diem cham van hoa ban dia buoi sang truoc khi len duong tro lai Ha Noi.',
      },
    ],
    includedItems: [
      'Tau dem hoac xe limousine tuy goi',
      'Khach san view nui trung tam Sapa',
      'Ve cap treo / combo len Fansipan theo goi',
      'Huong dan vien va bua an theo lich',
    ],
    promiseItems: [
      'Co the mo rong thanh phien ban trekking sau hon',
      'Linh hoat theo thoi tiet de giu trai nghiem dep nhat',
      'Phu hop cho nhom ban va cong ty nho can retreat ngan',
    ],
  },
  4: {
    eyebrow: 'Culture and cuisine route',
    season: 'Thang 1 - thang 8',
    groupSize: 'Toi da 14 khach',
    departureNote: 'Thu 6 va Chu nhat',
    departureSchedule: 'Khoi hanh som tu Da Nang hoac Ha Noi',
    meetingPoint: 'San bay Phu Bai / trung tam Hue',
    longDescription:
      'Day la detail tour dan nhac boi mau sac co do, am thuc cung dinh va nhung khoang di cham. Hue khong duoc xem nhu mot diem stop, ma la mot nhiet do rieng can duoc ngam ky.',
    curatorNote:
      'Hue dep khi ban cho no du do sau. Chung toi khong day lich qua day, thay vao do giu khoang cho dai noi, am thuc va nhung cuoc tan bo de thanh pho tu mo minh.',
    curatorName: 'Lan Anh, ADN Curator',
    overviewCards: [
      {
        icon: 'castle',
        title: 'Co do trong mot nhiep di cham',
        description:
          'Lich trinh de khoang cho ban ngam Hue bang ca mat va tai, khong chi check-in nhanh qua cac cong trinh.',
      },
      {
        icon: 'ramen_dining',
        title: 'Am thuc la mot cot tru',
        description:
          'Hanh trinh an uong duoc dat ngang hang voi tham quan, tu mon cung dinh den quan nha nho co chat rieng.',
      },
      {
        icon: 'self_improvement',
        title: 'Nhe nhang ma giau chat lieu',
        description:
          'Phu hop voi cap doi, gia dinh nho hoac nhom muon mot chuyen di co tinh thuong thuc hon la chay dua diem den.',
      },
    ],
    highlights: [
      {
        icon: 'account_balance',
        title: 'Dai Noi va nhung lop lich su',
        description: 'Duoc canh gio de tranh dong, giu nhiep tham quan thong dong va de nghe cau chuyen tot hon.',
      },
      {
        icon: 'restaurant',
        title: 'Ban an Hue co chu de',
        description: 'Tu bua sang dan da den bua toi chi tiet hon, tour co cot am thuc ro net thay vi chi ghe ngau nhien.',
      },
      {
        icon: 'directions_walk',
        title: 'Thanh pho hop de di bo',
        description: 'Nhieu doan duoc thiet ke cho tan bo ngan de cam nhan Hue bang nhiep thoi gian that.',
      },
    ],
    itinerary: [
      {
        label: 'Ngay 1',
        title: 'Vao Hue va can nhiet do',
        description:
          'Check-in, an trua nhe, di mot vong mo nhan thanh pho va bat dau bang mot diem den de vao khong khi Hue that tu nhien.',
      },
      {
        label: 'Ngay 2',
        title: 'Dai Noi - lang tam - bua toi theo concept',
        description:
          'Ngay cot song cua hanh trinh: tham quan di san, chen diem nghi, sau do khop lai bang bua toi co tinh trinh dien am thuc.',
      },
      {
        label: 'Ngay 3',
        title: 'Cafe sang, mua qua, ket tour',
        description:
          'Giu mot buoi sang nhe de thanh pho dong lai dep truoc khi khach roi Hue.',
      },
    ],
    includedItems: [
      'Luu tru trung tam Hue',
      'Xe dua don va huong dan suot tuyen',
      'Ve vao cong di san va mot bua toi signature',
      'Danh sach diem an va cafe de xuat theo concept',
    ],
    promiseItems: [
      'Co the nang cap thanh tour couple hoac tour family heritage',
      'Phu hop nhom khach yeu am thuc va kien truc',
      'Rat de mo rong sang combo Hue - Da Nang - Hoi An',
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
