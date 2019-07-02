//条件菜单显示隐藏状态
var ITEM_SELECTED = '0';
var ITEM_DEFUALT1 = '1';
var ITEM_DEFUALT2 = '2';

var PROVINCE_LIST = [{
		code: '0000',
		name: '全部'
	},
	{
		code: '0001',
		name: '江西省'
	},
	{
		code: '0002',
		name: '湖北省'
	}
];

var CITY_JX = [ //江西城市
	{
		code: '0001-0000',
		name: '全部'
	},
	{
		code: '0001-0001',
		name: '南昌市'
	},
	{
		code: '0001-0002',
		name: '上饶市'
	}
]

var CITY_HB = [ //湖北城市
	{
		code: '0002-0000',
		name: '全部'
	},
	{
		code: '0002-0001',
		name: '武汉市'
	},
	{
		code: '0002-0002',
		name: '襄阳市'
	}
]

var SCHOOL_LEVEL_LIST = [{
		code: '0000',
		name: '全部'
	},
	{
		code: '0001',
		name: '一本'
	},
	{
		code: '0002',
		name: '二本'
	},
	{
		code: '0003',
		name: '三本'
	}
]

var CLASSFY_LIST = [{
		code: '0000',
		name: '科学',
		checked: true
	},
	{
		code: '0001',
		name: '医学',
		checked: false
	},
	{
		code: '0002',
		name: '生物',
		checked: false
	},
	{
		code: '0003',
		name: '化学',
		checked: false
	}
]

var MORE_TYPE_LIST = [{
		code: '0000',
		name: '学费'
	},
	{
		code: '0001',
		name: '人数'
	}
]

var MORE_TUITION_LIST = [{
		code: '0001-0000',
		name: '0-5000元',
		checked: false
	},
	{
		code: '0001-0001',
		name: '5000-10000元',
		checked: false
	},
	{
		code: '0001-0002',
		name: '10000-15000元',
		checked: false
	},
	{
		code: '0001-0003',
		name: '15000-20000元',
		checked: false
	}
]
var MORE_PERSON_NUM_LIST = [{
		code: '0002-0000',
		name: '0-5000人',
		checked: false
	},
	{
		code: '0002-0001',
		name: '5000-10000人',
		checked: false
	},
	{
		code: '0002-0002',
		name: '10000-15000人',
		checked: false
	},
	{
		code: '0002-0003',
		name: '15000-20000人',
		checked: false
	}
]

var CALENDAR_DATA = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A,
	0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D,
	0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA,
	0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25,
	0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957,
	0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5,
	0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57,
	0x52B, 0xA93, 0x40E95);

var MADD = new Array(
	0,
	31,
	59,
	90,
	120,
	151,
	181,
	212,
	243,
	273,
	304,
	334
)

var TG = "甲乙丙丁戊己庚辛壬癸";
var DZ = "子丑寅卯辰巳午未申酉戌亥";
var NUM_CHINESE = "一二三四五六七八九十";
var NUM_MON = "正二三四五六七八九十冬腊";
var NUM_WEEK = "日一二三四五六";
var SX = "鼠牛虎兔龙蛇马羊猴鸡狗猪";

var MESAGE = [{
		headImg: 'img/812_superfast.jpg',
		nickName: '你你你',
		msg: '一二三四五六七八九十, 你会数嘛?'
	},
	{
		headImg: 'img/812_superfast.jpg',
		nickName: '我我我',
		msg: '一二三四五六七八九十, 我真的会数!'
	},
	{
		headImg: 'img/812_superfast.jpg',
		nickName: '他他他',
		msg: '一二三四五六七八九十,十九八七六五四三二一, 他还会倒着数~'
	}
]

var CHART_RECORDS = [{
		user: '001',
		headImg: 'img/812_superfast.jpg',
		nickName: '学霸一',
		msg: '一二三四五六七八九十, 你会数嘛?',
		msgTime: '9:11'
	},
	{
		user: '002',
		headImg: 'img/812_superfast.jpg',
		nickName: '学霸二',
		msg: '一二三四五六七八九十, so easy!',
		msgTime: '9:11'
	},
	{
		user: '003',
		headImg: 'img/812_superfast.jpg',
		nickName: '学神三',
		msg: '十九八七六五四三二一, 倒着走一遍!',
		msgTime: '9:11'
	},
	{
		user: '004',
		headImg: 'img/TKZC.jpg',
		nickName: '学渣我',
		msg: '你们自己数着玩,我撤了',
		msgTime: '9:11'
	}, {
		user: '001',
		headImg: 'img/812_superfast.jpg',
		nickName: '学霸一',
		msg: '一二三四五六七八九十, 你会数嘛?',
		msgTime: '9:11'
	},
	{
		user: '002',
		headImg: 'img/812_superfast.jpg',
		nickName: '学霸二',
		msg: '一二三四五六七八九十, so easy!',
		msgTime: '9:11'
	},
	{
		user: '003',
		headImg: 'img/812_superfast.jpg',
		nickName: '学神三',
		msg: '十九八七六五四三二一, 倒着走一遍!',
		msgTime: '9:11'
	},
	{
		user: '004',
		headImg: 'img/TKZC.jpg',
		nickName: '学渣我',
		msg: '你们自己数着玩,我撤了',
		msgTime: '9:11'
	},
	{
		user: '001',
		headImg: 'img/812_superfast.jpg',
		nickName: '学霸一',
		msg: '一二三四五六七八九十, 你会数嘛?',
		msgTime: '9:11'
	},
	{
		user: '002',
		headImg: 'img/812_superfast.jpg',
		nickName: '学霸二',
		msg: '一二三四五六七八九十, so easy!',
		msgTime: '9:11'
	},
	{
		user: '003',
		headImg: 'img/812_superfast.jpg',
		nickName: '学神三',
		msg: '十九八七六五四三二一, 倒着走一遍!',
		msgTime: '9:11'
	},
	{
		user: '004',
		headImg: 'img/TKZC.jpg',
		nickName: '学渣我',
		msg: '你们自己数着玩,我撤了',
		msgTime: '9:11'
	}
]
