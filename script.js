$(document).ready(function() {
	var language = "en";
	var available = false;
	var searchVal;
	var hasResult = false;

	function updateList() {
		var keyword = $("#input-container input").val();
		language = $("#lang-select").val();
		if (keyword === "") {
			return 0;
		}
		$("#results").empty();
		$("#results").removeClass("loaded");
		$.getJSON("https://" + language + ".wikipedia.org/w/api.php?action=opensearch&format=json&search=" + keyword + "&limit=20&redirects=resolve&namespaces=0&callback=?", function(data) {
			if (data[1].length === 0) {
				alert("Niks gevonden!");
				return 0;
			}
			for (var i = 0; i < data[1].length; i++) {
				var entry = $("<a target='_blank' href='" + data[3][i] + "'><li class='entry'></li></a>");
				var title = $("<div class='title'>" + data[1][i] + "</div>");
				var desc = $("<div class='desc'>" + data[2][i] + "</div>");

				entry.children("li").append(title);
				entry.children("li").append(desc);
				$("#results").append(entry);
			}
			available = true;
			if (available) {
				$("#results").addClass("loaded");
				hasResult = true;
			}
			$("#input-container input").blur();
		});
	}

	function autoComplete(e) {
		if(e.keyCode === 13) { $("#autocomplete").empty(); return 0; }
		searchVal = $("#search-container input").val();
		if (!searchVal) {
			$("#autocomplete").empty();
			return 0;
		}
		$.getJSON("https://" + language + ".wikipedia.org/w/api.php?action=opensearch&search=" + searchVal + "&format=json&limit=5&suggest&callback=?", function(data) {
			$("#autocomplete").empty();
			for (var i = 0; i < data[1].length; i++) {
				var result = $("<a><li class='acresult'>" + data[1][i] + "</li></a>");
				$("#autocomplete").append(result);
			}
		});
	}
	
	$("#autocomplete").on('click', '.acresult', function() {
		var value = $(this).html();
		$("#search-container input").val(value);
		updateList();
		$("#autocomplete").empty();
		$("#search-container input").empty();
	});

	$("#search-container input").on("keyup paste", autoComplete);

	$("#input-container .button").on("click", function() {
		if ($("#input-container input").val() !== "") {
			$("#input-container").addClass("searching");
			$("#input-row").addClass("searching");
			$("#autocomplete").empty();
			if (available) {
				$("ul").addClass("loaded");
			}
			updateList();
		} else {
			$("#input-container").removeClass("searching");
			$("#input-row").removeClass("searching");
			$("ul").removeClass("loaded");
			setTimeout(function() {
				$("ul").empty();
			}, 500);
		}
	});

	$("#input-container input").on("click", function() {
		$("#input-container").addClass("searching");
		$("#input-row").addClass("searching");
		if (available) {
			$("ul").addClass("loaded");
		}
	})

	$("html, body").on("click", function() {
		$("ul").removeClass("loaded");
		setTimeout(function() {
			$("ul").empty();
		}, 500);
		$("#input-container").removeClass("searching");
		$("#input-row").removeClass("searching");
	})

	$('#input-container').click(function(event) {
		event.stopPropagation();
	});

	$("#input-container input").keydown(function(e) {
		if (e.keyCode == 13) {
			if ($("#search-container input").val() === "") {
				$("ul").removeClass("loaded");
				$("#input-row").removeClass("searching");
				setTimeout(function() {
					$("ul").empty();
				}, 500);
				$("#input-container").removeClass("searching");
				return 0;
			}
			$("#input-container").addClass("searching");
			$("#input-row").addClass("searching");
			if (available) {
				$("ul").addClass("loaded");
			}
			updateList();
		}
	});

	$("#random").on("click", function() {
		window.open("https://" + language + ".wikipedia.org/wiki/Special:Random");
	});

	$("#lang-select").change(function() {
		language = $(this).val();
	});

	for (var langCode in isoLangs) {
		if (isoLangs.hasOwnProperty(langCode)) {
			var name = isoLangs[langCode].nativeName;
			var code = langCode;
			var option = $("<option value='" + code + "'>" + name + "</option>")
			$("#lang-select").append(option);
		}
	}
});

var isoLangs = {
	"en": {
		"name": "English",
		"nativeName": "English"
	},
	"nl": {
		"name": "Dutch",
		"nativeName": "Nederlands"
	},
	"de": {
		"name": "German",
		"nativeName": "Deutsch"
	},
	"fr": {
		"name": "French",
		"nativeName": "français, langue française"
	},
	"es": {
		"name": "Spanish; Castilian",
		"nativeName": "español, castellano"
	},
	"aa": {
		"name": "Afar",
		"nativeName": "Afaraf"
	},
	"af": {
		"name": "Afrikaans",
		"nativeName": "Afrikaans"
	},
	"ak": {
		"name": "Akan",
		"nativeName": "Akan"
	},
	"sq": {
		"name": "Albanian",
		"nativeName": "Shqip"
	},
	"ab": {
		"name": "Abkhaz",
		"nativeName": "аҧсуа"
	},
	"am": {
		"name": "Amharic",
		"nativeName": "አማርኛ"
	},
	"ar": {
		"name": "Arabic",
		"nativeName": "العربية"
	},
	"an": {
		"name": "Aragonese",
		"nativeName": "Aragonés"
	},
	"hy": {
		"name": "Armenian",
		"nativeName": "Հայերեն"
	},
	"as": {
		"name": "Assamese",
		"nativeName": "অসমীয়া"
	},
	"av": {
		"name": "Avaric",
		"nativeName": "авар мацӀ, магӀарул мацӀ"
	},
	"ae": {
		"name": "Avestan",
		"nativeName": "avesta"
	},
	"ay": {
		"name": "Aymara",
		"nativeName": "aymar aru"
	},
	"az": {
		"name": "Azerbaijani",
		"nativeName": "azərbaycan dili"
	},
	"bm": {
		"name": "Bambara",
		"nativeName": "bamanankan"
	},
	"ba": {
		"name": "Bashkir",
		"nativeName": "башҡорт теле"
	},
	"eu": {
		"name": "Basque",
		"nativeName": "euskara, euskera"
	},
	"be": {
		"name": "Belarusian",
		"nativeName": "Беларуская"
	},
	"bn": {
		"name": "Bengali",
		"nativeName": "বাংলা"
	},
	"bh": {
		"name": "Bihari",
		"nativeName": "भोजपुरी"
	},
	"bi": {
		"name": "Bislama",
		"nativeName": "Bislama"
	},
	"bs": {
		"name": "Bosnian",
		"nativeName": "bosanski jezik"
	},
	"br": {
		"name": "Breton",
		"nativeName": "brezhoneg"
	},
	"bg": {
		"name": "Bulgarian",
		"nativeName": "български език"
	},
	"my": {
		"name": "Burmese",
		"nativeName": "ဗမာစာ"
	},
	"ca": {
		"name": "Catalan; Valencian",
		"nativeName": "Català"
	},
	"ch": {
		"name": "Chamorro",
		"nativeName": "Chamoru"
	},
	"ce": {
		"name": "Chechen",
		"nativeName": "нохчийн мотт"
	},
	"ny": {
		"name": "Chichewa; Chewa; Nyanja",
		"nativeName": "chiCheŵa, chinyanja"
	},
	"zh": {
		"name": "Chinese",
		"nativeName": "中文 (Zhōngwén), 汉语, 漢語"
	},
	"cv": {
		"name": "Chuvash",
		"nativeName": "чӑваш чӗлхи"
	},
	"kw": {
		"name": "Cornish",
		"nativeName": "Kernewek"
	},
	"co": {
		"name": "Corsican",
		"nativeName": "corsu, lingua corsa"
	},
	"cr": {
		"name": "Cree",
		"nativeName": "ᓀᐦᐃᔭᐍᐏᐣ"
	},
	"hr": {
		"name": "Croatian",
		"nativeName": "hrvatski"
	},
	"cs": {
		"name": "Czech",
		"nativeName": "česky, čeština"
	},
	"da": {
		"name": "Danish",
		"nativeName": "dansk"
	},
	"dv": {
		"name": "Divehi; Dhivehi; Maldivian;",
		"nativeName": "ދިވެހި"
	},
	"eo": {
		"name": "Esperanto",
		"nativeName": "Esperanto"
	},
	"et": {
		"name": "Estonian",
		"nativeName": "eesti, eesti keel"
	},
	"ee": {
		"name": "Ewe",
		"nativeName": "Eʋegbe"
	},
	"fo": {
		"name": "Faroese",
		"nativeName": "føroyskt"
	},
	"fj": {
		"name": "Fijian",
		"nativeName": "vosa Vakaviti"
	},
	"fi": {
		"name": "Finnish",
		"nativeName": "suomi, suomen kieli"
	},
	"ff": {
		"name": "Fula; Fulah; Pulaar; Pular",
		"nativeName": "Fulfulde, Pulaar, Pular"
	},
	"gl": {
		"name": "Galician",
		"nativeName": "Galego"
	},
	"ka": {
		"name": "Georgian",
		"nativeName": "ქართული"
	},
	"el": {
		"name": "Greek, Modern",
		"nativeName": "Ελληνικά"
	},
	"gn": {
		"name": "Guaraní",
		"nativeName": "Avañeẽ"
	},
	"gu": {
		"name": "Gujarati",
		"nativeName": "ગુજરાતી"
	},
	"ht": {
		"name": "Haitian; Haitian Creole",
		"nativeName": "Kreyòl ayisyen"
	},
	"ha": {
		"name": "Hausa",
		"nativeName": "Hausa, هَوُسَ"
	},
	"he": {
		"name": "Hebrew (modern)",
		"nativeName": "עברית"
	},
	"hz": {
		"name": "Herero",
		"nativeName": "Otjiherero"
	},
	"hi": {
		"name": "Hindi",
		"nativeName": "हिन्दी, हिंदी"
	},
	"ho": {
		"name": "Hiri Motu",
		"nativeName": "Hiri Motu"
	},
	"hu": {
		"name": "Hungarian",
		"nativeName": "Magyar"
	},
	"ia": {
		"name": "Interlingua",
		"nativeName": "Interlingua"
	},
	"id": {
		"name": "Indonesian",
		"nativeName": "Bahasa Indonesia"
	},
	"ie": {
		"name": "Interlingue",
		"nativeName": "Interlingue"
	},
	"ga": {
		"name": "Irish",
		"nativeName": "Gaeilge"
	},
	"ig": {
		"name": "Igbo",
		"nativeName": "Asụsụ Igbo"
	},
	"ik": {
		"name": "Inupiaq",
		"nativeName": "Iñupiaq, Iñupiatun"
	},
	"io": {
		"name": "Ido",
		"nativeName": "Ido"
	},
	"is": {
		"name": "Icelandic",
		"nativeName": "Íslenska"
	},
	"it": {
		"name": "Italian",
		"nativeName": "Italiano"
	},
	"iu": {
		"name": "Inuktitut",
		"nativeName": "ᐃᓄᒃᑎᑐᑦ"
	},
	"ja": {
		"name": "Japanese",
		"nativeName": "日本語 (にほんご／にっぽんご)"
	},
	"jv": {
		"name": "Javanese",
		"nativeName": "basa Jawa"
	},
	"kl": {
		"name": "Kalaallisut, Greenlandic",
		"nativeName": "kalaallisut, kalaallit oqaasii"
	},
	"kn": {
		"name": "Kannada",
		"nativeName": "ಕನ್ನಡ"
	},
	"kr": {
		"name": "Kanuri",
		"nativeName": "Kanuri"
	},
	"ks": {
		"name": "Kashmiri",
		"nativeName": "कश्मीरी, كشميري‎"
	},
	"kk": {
		"name": "Kazakh",
		"nativeName": "Қазақ тілі"
	},
	"km": {
		"name": "Khmer",
		"nativeName": "ភាសាខ្មែរ"
	},
	"ki": {
		"name": "Kikuyu, Gikuyu",
		"nativeName": "Gĩkũyũ"
	},
	"rw": {
		"name": "Kinyarwanda",
		"nativeName": "Ikinyarwanda"
	},
	"ky": {
		"name": "Kirghiz, Kyrgyz",
		"nativeName": "кыргыз тили"
	},
	"kv": {
		"name": "Komi",
		"nativeName": "коми кыв"
	},
	"kg": {
		"name": "Kongo",
		"nativeName": "KiKongo"
	},
	"ko": {
		"name": "Korean",
		"nativeName": "한국어 (韓國語), 조선말 (朝鮮語)"
	},
	"ku": {
		"name": "Kurdish",
		"nativeName": "Kurdî, كوردی‎"
	},
	"kj": {
		"name": "Kwanyama, Kuanyama",
		"nativeName": "Kuanyama"
	},
	"la": {
		"name": "Latin",
		"nativeName": "latine, lingua latina"
	},
	"lb": {
		"name": "Luxembourgish, Letzeburgesch",
		"nativeName": "Lëtzebuergesch"
	},
	"lg": {
		"name": "Luganda",
		"nativeName": "Luganda"
	},
	"li": {
		"name": "Limburgish, Limburgan, Limburger",
		"nativeName": "Limburgs"
	},
	"ln": {
		"name": "Lingala",
		"nativeName": "Lingála"
	},
	"lo": {
		"name": "Lao",
		"nativeName": "ພາສາລາວ"
	},
	"lt": {
		"name": "Lithuanian",
		"nativeName": "lietuvių kalba"
	},
	"lu": {
		"name": "Luba-Katanga",
		"nativeName": ""
	},
	"lv": {
		"name": "Latvian",
		"nativeName": "latviešu valoda"
	},
	"gv": {
		"name": "Manx",
		"nativeName": "Gaelg, Gailck"
	},
	"mk": {
		"name": "Macedonian",
		"nativeName": "македонски јазик"
	},
	"mg": {
		"name": "Malagasy",
		"nativeName": "Malagasy fiteny"
	},
	"ms": {
		"name": "Malay",
		"nativeName": "bahasa Melayu, بهاس ملايو‎"
	},
	"ml": {
		"name": "Malayalam",
		"nativeName": "മലയാളം"
	},
	"mt": {
		"name": "Maltese",
		"nativeName": "Malti"
	},
	"mi": {
		"name": "Māori",
		"nativeName": "te reo Māori"
	},
	"mr": {
		"name": "Marathi (Marāṭhī)",
		"nativeName": "मराठी"
	},
	"mh": {
		"name": "Marshallese",
		"nativeName": "Kajin M̧ajeļ"
	},
	"mn": {
		"name": "Mongolian",
		"nativeName": "монгол"
	},
	"na": {
		"name": "Nauru",
		"nativeName": "Ekakairũ Naoero"
	},
	"nv": {
		"name": "Navajo, Navaho",
		"nativeName": "Diné bizaad, Dinékʼehǰí"
	},
	"nb": {
		"name": "Norwegian Bokmål",
		"nativeName": "Norsk bokmål"
	},
	"nd": {
		"name": "North Ndebele",
		"nativeName": "isiNdebele"
	},
	"ne": {
		"name": "Nepali",
		"nativeName": "नेपाली"
	},
	"ng": {
		"name": "Ndonga",
		"nativeName": "Owambo"
	},
	"nn": {
		"name": "Norwegian Nynorsk",
		"nativeName": "Norsk nynorsk"
	},
	"no": {
		"name": "Norwegian",
		"nativeName": "Norsk"
	},
	"ii": {
		"name": "Nuosu",
		"nativeName": "ꆈꌠ꒿ Nuosuhxop"
	},
	"nr": {
		"name": "South Ndebele",
		"nativeName": "isiNdebele"
	},
	"oc": {
		"name": "Occitan",
		"nativeName": "Occitan"
	},
	"oj": {
		"name": "Ojibwe, Ojibwa",
		"nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ"
	},
	"cu": {
		"name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
		"nativeName": "ѩзыкъ словѣньскъ"
	},
	"om": {
		"name": "Oromo",
		"nativeName": "Afaan Oromoo"
	},
	"or": {
		"name": "Oriya",
		"nativeName": "ଓଡ଼ିଆ"
	},
	"os": {
		"name": "Ossetian, Ossetic",
		"nativeName": "ирон æвзаг"
	},
	"pa": {
		"name": "Panjabi, Punjabi",
		"nativeName": "ਪੰਜਾਬੀ, پنجابی‎"
	},
	"pi": {
		"name": "Pāli",
		"nativeName": "पाऴि"
	},
	"fa": {
		"name": "Persian",
		"nativeName": "فارسی"
	},
	"pl": {
		"name": "Polish",
		"nativeName": "polski"
	},
	"ps": {
		"name": "Pashto, Pushto",
		"nativeName": "پښتو"
	},
	"pt": {
		"name": "Portuguese",
		"nativeName": "Português"
	},
	"qu": {
		"name": "Quechua",
		"nativeName": "Runa Simi, Kichwa"
	},
	"rm": {
		"name": "Romansh",
		"nativeName": "rumantsch grischun"
	},
	"rn": {
		"name": "Kirundi",
		"nativeName": "kiRundi"
	},
	"ro": {
		"name": "Romanian, Moldavian, Moldovan",
		"nativeName": "română"
	},
	"ru": {
		"name": "Russian",
		"nativeName": "русский язык"
	},
	"sa": {
		"name": "Sanskrit (Saṁskṛta)",
		"nativeName": "संस्कृतम्"
	},
	"sc": {
		"name": "Sardinian",
		"nativeName": "sardu"
	},
	"sd": {
		"name": "Sindhi",
		"nativeName": "सिन्धी, سنڌي، سندھی‎"
	},
	"se": {
		"name": "Northern Sami",
		"nativeName": "Davvisámegiella"
	},
	"sm": {
		"name": "Samoan",
		"nativeName": "gagana faa Samoa"
	},
	"sg": {
		"name": "Sango",
		"nativeName": "yângâ tî sängö"
	},
	"sr": {
		"name": "Serbian",
		"nativeName": "српски језик"
	},
	"gd": {
		"name": "Scottish Gaelic; Gaelic",
		"nativeName": "Gàidhlig"
	},
	"sn": {
		"name": "Shona",
		"nativeName": "chiShona"
	},
	"si": {
		"name": "Sinhala, Sinhalese",
		"nativeName": "සිංහල"
	},
	"sk": {
		"name": "Slovak",
		"nativeName": "slovenčina"
	},
	"sl": {
		"name": "Slovene",
		"nativeName": "slovenščina"
	},
	"so": {
		"name": "Somali",
		"nativeName": "Soomaaliga, af Soomaali"
	},
	"st": {
		"name": "Southern Sotho",
		"nativeName": "Sesotho"
	},
	"su": {
		"name": "Sundanese",
		"nativeName": "Basa Sunda"
	},
	"sw": {
		"name": "Swahili",
		"nativeName": "Kiswahili"
	},
	"ss": {
		"name": "Swati",
		"nativeName": "SiSwati"
	},
	"sv": {
		"name": "Swedish",
		"nativeName": "svenska"
	},
	"ta": {
		"name": "Tamil",
		"nativeName": "தமிழ்"
	},
	"te": {
		"name": "Telugu",
		"nativeName": "తెలుగు"
	},
	"tg": {
		"name": "Tajik",
		"nativeName": "тоҷикӣ, toğikī, تاجیکی‎"
	},
	"th": {
		"name": "Thai",
		"nativeName": "ไทย"
	},
	"ti": {
		"name": "Tigrinya",
		"nativeName": "ትግርኛ"
	},
	"bo": {
		"name": "Tibetan Standard, Tibetan, Central",
		"nativeName": "བོད་ཡིག"
	},
	"tk": {
		"name": "Turkmen",
		"nativeName": "Türkmen, Түркмен"
	},
	"tl": {
		"name": "Tagalog",
		"nativeName": "Wikang Tagalog"
	},
	"tn": {
		"name": "Tswana",
		"nativeName": "Setswana"
	},
	"to": {
		"name": "Tonga (Tonga Islands)",
		"nativeName": "faka Tonga"
	},
	"tr": {
		"name": "Turkish",
		"nativeName": "Türkçe"
	},
	"ts": {
		"name": "Tsonga",
		"nativeName": "Xitsonga"
	},
	"tt": {
		"name": "Tatar",
		"nativeName": "татарча, tatarça, تاتارچا‎"
	},
	"tw": {
		"name": "Twi",
		"nativeName": "Twi"
	},
	"ty": {
		"name": "Tahitian",
		"nativeName": "Reo Tahiti"
	},
	"ug": {
		"name": "Uighur, Uyghur",
		"nativeName": "Uyƣurqə, ئۇيغۇرچە‎"
	},
	"uk": {
		"name": "Ukrainian",
		"nativeName": "українська"
	},
	"ur": {
		"name": "Urdu",
		"nativeName": "اردو"
	},
	"uz": {
		"name": "Uzbek",
		"nativeName": "zbek, Ўзбек, أۇزبېك‎"
	},
	"ve": {
		"name": "Venda",
		"nativeName": "Tshivenḓa"
	},
	"vi": {
		"name": "Vietnamese",
		"nativeName": "Tiếng Việt"
	},
	"vo": {
		"name": "Volapük",
		"nativeName": "Volapük"
	},
	"wa": {
		"name": "Walloon",
		"nativeName": "Walon"
	},
	"cy": {
		"name": "Welsh",
		"nativeName": "Cymraeg"
	},
	"wo": {
		"name": "Wolof",
		"nativeName": "Wollof"
	},
	"fy": {
		"name": "Western Frisian",
		"nativeName": "Frysk"
	},
	"xh": {
		"name": "Xhosa",
		"nativeName": "isiXhosa"
	},
	"yi": {
		"name": "Yiddish",
		"nativeName": "ייִדיש"
	},
	"yo": {
		"name": "Yoruba",
		"nativeName": "Yorùbá"
	},
	"za": {
		"name": "Zhuang, Chuang",
		"nativeName": "Saɯ cueŋƅ, Saw cuengh"
	}
}