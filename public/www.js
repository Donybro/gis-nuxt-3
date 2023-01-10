setTimeout(() => {
        let top_js = "1.0";
        let top_r =
            "id=1445&r=" +
            escape(document.referrer) +
            "&pg=" +
            escape(window.location.href);
        document.cookie = "smart_top=1; path=/";
        top_r += "&c=" + (document.cookie ? "Y" : "N");
        top_js = "1.1";
        top_r += "&j=" + (navigator.javaEnabled() ? "Y" : "N");
        top_js = "1.2";
        top_r +=
            "&wh=" +
            screen.width +
            "x" +
            screen.height +
            "&px=" +
            (navigator.appName.substring(0, 3) == "Mic"
                ? screen.colorDepth
                : screen.pixelDepth);
        top_js = "1.3";
        let top_rat = "&col=0063AF&t=ffffff&p=E6850F";
        top_r += "&js=" + top_js + "";

        document.querySelector("#rated").innerHTML =
            '<a href="http://www.uz/ru/res/visitor/index?id=1445" target=_top><img src="http://cnt0.www.uz/counter/collect?' +
            top_r +
            top_rat +
            '" width=88 height=31 border=0 alt="Топ рейтинг www.uz"></a>';
    }, 300);
