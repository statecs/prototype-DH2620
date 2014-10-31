/* $ShowCase v2.2 */
String.prototype.removeWS = function() {
    return this.toString().replace(/\s/g, "")
};
String.prototype.pF = function() {
    return parseFloat(this)
};
Number.prototype.pF = function() {
    return parseFloat(this)
};
String.prototype.sP = function(e, t) {
    return this.toString().split(e)[t]
};
String.prototype.isB = function() {
    return this.toString() == "true" ? true : false
};
Boolean.prototype.isB = function() {
    return this == true ? true : false
};
(function(e) {
    var t = {
        currentOBJ: false,
        TThideTimer: false,
        total: 0,
        defaults: {
            flicker: true,
            flicker_time: "350,0",
            flicker_effect: "ease",
            flicker_size: 1.5,
            flicker_opacity: "0.5,1",
            flicker_color: "#000000,#ff0000",
            flicker_image: false,
            border_radius: "500,500",
            border_size: "3,3",
            border_color: "#222222,#222222",
            coords: "10,10",
            path: false,
            loop_path: true,
            path_time: "0,0",
            path_tip: false,
            path_tip_offset: false,
            flicker_gradient: false,
            gradient_points: "40,50",
            hideBullets: true,
            tooltip_offset: "0,0",
            tooltip_speed: "500,350",
            tooltip_effect: "ease,ease",
            tooltip_close: "hover",
            panel_speed: "700,500",
            panel_effect: "ease-in-out,ease-in-out",
            panel_coords: "20,20",
            openTooltip: false,
            closeTooltip: false,
            openPanel: false,
            closePanel: false,
            prevPanel: false,
            nextPanel: false
        },
        init: function(n) {
            var r = e.extend({}, t.defaults, n);
            e.each(e(this), function() {
                $Bullets = e(this).find("div.SC_Bullet");
                for (var n = 0, i = $Bullets.length; n < i; n++) {
                    var s = e($Bullets[n]),
                        u = s.data().showcase != undefined ? s.data().showcase : false;
                    e.data(s[0], e.extend({}, r, !u ? {} : u || {}));
                    var a = e.data(s[0]),
                        f = t;
                    $TT = s.next("div"), $PN = $TT.next("div");
                    a.hasTT = $TT.hasClass("SC_Tooltip") ? $TT : false;
                    a.hasPN = $PN.hasClass("SC_Panel") ? $PN : false;
                    a.index = n + 1;
                    a.initiator = this;
                    a.total = i;
                    f.UserSettings(s, a);
                    f.Prep(s, a)
                }
                $Bullets.on("mouseenter", function() {
                    clearTimeout(t.TThideTimer);
                    var n = e(this),
                        r = e.data(n[0]);
                    if (t.currentOBJ || !r.hasTT || r.path_tip) return;
                    t.openTooltip(n, r, r.hasTT, r.t_offX, r.t_offY)
                }).on("mouseleave", function() {
                    var n = e.data(e(this)[0]),
                        r = n.hasTT;
                    if (!r || r.hasClass("SC_Hovered")) return;
                    t.TThideTimer = setTimeout(function() {
                        clearTimeout(t.TThideTimer);
                        if (r.hasClass("SC_Hovered")) return;
                        t.closeTooltip(r, n)
                    }, 300)
                }).on("click", function(n) {
                    var r = e(this),
                        i = e.data(r[0]),
                        s = i.hasPN,
                        o = i.hasTT;
                    if (t.currentOBJ || !s || !o || i.tt_clse === 2 && n.target === o.find(".SC_Close")[0]) return;
                    t.openPanel(r, o, s, i, false)
                })
            });
            e("div.SC_Tooltip").on("mouseenter", function() {
                e(this).addClass("SC_Hovered")
            }).on("mouseleave", function() {
                var n = e(this),
                    r = n.prevAll("div.SC_Bullet:first"),
                    i = e.data(r[0]);
                if (i.tt_clse === 2) return;
                n.removeClass("SC_Hovered");
                t.closeTooltip(n, i)
            }).on("click", function(n) {
                var r = e(this),
                    i = r.prevAll("div.SC_Bullet:first"),
                    s = e.data(i[0]),
                    o = s.hasPN;
                if (t.currentOBJ || !o || s.tt_clse === 2 && n.target === r.find(".SC_Close")[0]) return;
                t.openPanel(i, r, o, s, false)
            }).find(".SC_Close").on("click", function() {
                var n = e(this).parents("div.SC_Tooltip:first"),
                    r = n.prev("div.SC_Bullet:first"),
                    i = e.data(r[0]);
                if (i.tt_clse === 1) return;
                t.closeTooltip(n, i)
            });
            e(".SC_Next").on("click", function() {
                var n = e(this).parents("div.SC_Panel:first").prev("div.SC_Tooltip").prev("div.SC_Bullet"),
                    r = e.data(n[0]);
                t.nextPanel(r, n, n.nextAll("div.SC_Panel:first"))
            });
            e(".SC_Prev").on("click", function() {
                var n = e(this).parents("div.SC_Panel:first").prev("div.SC_Tooltip").prev("div.SC_Bullet"),
                    r = e.data(n[0]);
                t.prevPanel(r, n, n.nextAll("div.SC_Panel:first"))
            });
            e(document).on("click", function(n) {
                var r = n.target,
                    i = e(r).parents(".SC_Panel:first").length,
                    s = !e(r).hasClass(".SC_Close");
                if (!t.currentOBJ || i && s) return;
                var o = t.currentOBJ,
                    u = e.data(o[0]),
                    a = u.hasTT,
                    f = u.hasPN;
                if (!f) return;
                t.closePanel(o, f, u, false)
            }).on("keydown.SC", function(n) {
                if (!t.currentOBJ) return;
                var r = n.which || n.keyCode,
                    i = t.currentOBJ,
                    s = e.data(i[0]),
                    o = s.hasPN;
                if (o && r == 39) t.nextPanel(s, i, o);
                if (o && r == 37) t.prevPanel(s, i, o)
            })
        },
        openTooltip: function(t, n, r, i, s) {
            var o = t.position(),
                u = e(n.initiator).outerWidth(true),
                a = e(n.initiator).outerHeight(true),
                f = o.left + i,
                l = o.top + s;
            r.css({
                visibility: "visible",
                top: l + "px",
                left: f + "px"
            });
            var c = r.outerWidth(true),
                h = r.outerHeight(true),
                p = r.position();
            if (p.top + h >= a) var l = a - h;
            if (p.left + c >= u) var f = u - c;
            e(n.initiator).find("div.SC_Bullet").PSE();
            r.css({
                top: l + "px",
                left: f + "px"
            }).Ani({
                opacity: 1
            }, n.tt_si, n.tooltip_effect.split(",")[0], function() {
                if (typeof n.openTooltip === "function") n.openTooltip.apply(this)
            })
        },
        closeTooltip: function(t, n) {
            t.Ani({
                opacity: 0
            }, n.tt_so, n.tooltip_effect.split(",")[1], function() {
                e(n.initiator).find("div.SC_Bullet").PLY();
                t[0].style.visibility = "hidden";
                if (typeof n.closeTooltip === "function") n.closeTooltip.apply(this)
            })
        },
        openPanel: function(n, r, i, s, o) {
            if (!o) n.PSE();
            r[0].style.visibility = "hidden";
            if (s.hideBS) e(s.initiator).find("div.SC_Bullet").not(n).css("visibility", "hidden");
            i.css({
                visibility: "visible",
                top: s.p_y,
                left: s.p_x
            }).Ani({
                opacity: 1
            }, s.pn_si, s.panel_effect.split(",")[1], function() {
                t.currentOBJ = n;
                if (typeof s.openPanel === "function") s.openPanel.apply(this)
            })
        },
        closePanel: function(n, r, i, s) {
            if (i.hideBS) e(i.initiator).find("div.SC_Bullet").css("visibility", "visible");
            r.Ani({
                opacity: 0
            }, i.pn_so, i.panel_effect.split(",")[1], function() {
                if (!s) n.PLY();
                r[0].style.visibility = "hidden";
                if (!s) t.currentOBJ = false;
                if (typeof i.closePanel === "function") i.closePanel.apply(this)
            })
        },
        nextPanel: function(n, r, i) {
            if (n.index < n.total) {
                var s = r.nextAll("div.SC_Bullet:first"),
                    o = s.next("div.SC_Tooltip"),
                    u = o.next("div.SC_Panel"),
                    a = e.data(s[0]);
                t.closePanel(r, i, n, true);
                t.openPanel(s, o, u, a, true);
                if (typeof n.nextPanel === "function") n.nextPanel.apply(this)
            }
        },
        prevPanel: function(n, r, i) {
            if (n.index > 1) {
                var s = r.prevAll("div.SC_Bullet:first"),
                    o = s.next("div.SC_Tooltip"),
                    u = o.next("div.SC_Panel"),
                    a = e.data(s[0]);
                t.closePanel(r, i, n, true);
                t.openPanel(s, o, u, a, true);
                if (typeof n.prevPanel === "function") n.prevPanel.apply(this)
            }
        },
        Prep: function(n, r) {
            var i = false;
            n.css({
                cursor: r.hasTT ? "pointer" : "default",
                left: r.coords.split(",")[0].pF() + "%",
                top: r.coords.split(",")[1].pF() + "%",
                borderRadius: r.b_bdr_ri,
                backgroundColor: r.flkr_clri,
                borderWidth: r.b_bdr_szi,
                borderColor: r.b_bdr_clri,
                opacity: r.flkr_oi
            });
            if (r.hasTT) n.next("div").css({
                transition: "all " + r.tt_si * 1e3 + "s " + r.tooltip_effect.split(",")[0] + " 0s",
                cursor: r.hasPN ? "pointer" : "default"
            });
            if (r.flicker_image) {
                n.css("background-image", "url(" + r.flicker_image + ")")
            } else if (r.flicker_gradient) {
                var s = t.H2R(r.flkr_clri, 1),
                    o = "rgba(" + s.r + "," + s.g + "," + s.b + ",1)";
                n.css({
                    background: "radial-gradient(ellipse at center," + o + " " + r.grad_pti + "%,rgba(255,255,255,0) " + r.grad_pto + "%)",
                    "background-size": r.flkr_grad_szi + "%",
                    "background-repeat": "no-repeat"
                })
            }
            if (r.path) t.pathMover(n, r);
            if (r.flkr) {
                n.addClass("SC_flicker");
                var u = "",
                    a = "",
                    i = "Flicker_" + r.initiator.id + "_" + r.index + " " + r.flkr_s + "s " + r.flkr_d + "s infinite alternate forwards " + r.flicker_effect;
                if (r.flkr_oi !== r.flkr_oo) {
                    u += "opacity:" + r.flkr_oi + ";";
                    a += "opacity:" + r.flkr_oo + ";"
                }
                if (r.iniW !== r.iniW * r.flkr_z) {
                    u += "width:" + r.iniW + "px;";
                    a += "width:" + r.iniW * r.flkr_z + "px;"
                }
                if (r.iniH !== r.iniH * r.flkr_z) {
                    u += "height:" + r.iniH + "px;";
                    a += "height:" + r.iniH * r.flkr_z + "px;"
                }
                if (!r.flicker_gradient && r.flkr_clri !== r.flkr_clro) {
                    u += "background-color:" + r.flkr_clri + ";";
                    a += "background-color:" + r.flkr_clro + ";"
                }
                if (r.b_bdr_ri !== r.b_bdr_ro) {
                    u += "border-radius:" + r.b_bdr_ri + ";";
                    a += "border-radius:" + r.b_bdr_ro + ";"
                }
                if (r.b_bdr_szi !== r.b_bdr_szo) {
                    u += "border-width:" + r.b_bdr_szi + ";";
                    a += "border-width:" + r.b_bdr_szo + ";"
                }
                if (r.b_bdr_clri !== r.b_bdr_clro) {
                    u += "border-color:" + r.b_bdr_clri + ";";
                    a += "border-color:" + r.b_bdr_clro + ";"
                }
                if (r.flicker_gradient && r.flkr_grad_szi !== r.flkr_grad_szo) {
                    u += "background-size:" + r.flkr_grad_szi + "%;";
                    a += "background-size:" + r.flkr_grad_szo + "%;"
                }
                if (!e("#SC_KEY_" + r.initiator.id + "_" + r.index).length) e("head").append('<style id="SC_KEY_' + r.initiator.id + "_" + r.index + '">@' + e.support.SC.PRE + "keyframes Flicker_" + r.initiator.id + "_" + r.index + " {from {" + u + "}to{" + a + "}}</style>")
            }
            if (i) n.css(e.support.SC.PRE + "animation", i)
        },
        pathMover: function(n, r) {
            var i = r.path.split("||"),
                s = r.path_time.split("||"),
                o = r.path_tip ? r.path_tip.split("||") : false,
                u = r.path_tip_offset ? r.path_tip_offset.split("||") : false,
                a = i.length;
            if (a === 0) return;
            var f = i[0].split(","),
                l = s ? s[0].split(",") : false,
                c = o ? o[0].split(",") : false,
                h = u ? u[0].split(",") : false,
                p = 0;
            e(function d() {
                n.delay(l[1]).animate({
                    left: f[0] + "%",
                    top: f[1] + "%"
                }, {
                    duration: l[0].pF(),
                    queue: true,
                    complete: function() {
                        p++;
                        if (p === a) {
                            if (r.loop_path) t.pathMover(n, r);
                            return
                        }
                        f = i[p].split(",");
                        l = s[p] ? s[p].split(",") : [500, 500];
                        c = o ? o[p].split(",") : false;
                        h = u ? u[p].split(",") : false;
                        if (c.toString() === "false") {
                            d()
                        } else {
                            t.openTooltip(n, r, e("#" + c), h[0].pF(), h[1].pF());
                            e("#" + c).on("click", function() {
                                e("#" + c).Ani({
                                    opacity: 0
                                }, r.tt_so, r.tooltip_effect.split(",")[1], function() {
                                    e(r.initiator).find("div.SC_Bullet").PLY();
                                    e("#" + c)[0].style.visibility = "hidden";
                                    if (typeof r.closeTooltip === "function") r.closeTooltip.apply(this);
                                    (4)()
                                })
                            })
                        }
                    }
                })
            })
        },
        H2R: function(e, n) {
            return {
                r: parseInt(t.tHx(e).substring(0, 2), 16),
                g: parseInt(t.tHx(e).substring(2, 4), 16),
                b: parseInt(t.tHx(e).substring(4, 6), 16),
                a: n
            }
        },
        tHx: function(e) {
            return e.charAt(0) == "#" ? e.substring(1, 7) : e
        },
        UserSettings: function(e, t) {
            e.data({
                flkr: t.flicker.isB(),
                flkr_s: t.flicker_time.split(",")[0].pF() / 1e3,
                flkr_d: t.flicker_time.split(",")[1].pF() / 1e3,
                flkr_z: t.flicker_size.pF(),
                flkr_oi: t.flicker_opacity.split(",")[0].pF(),
                flkr_oo: t.flicker_opacity.split(",")[1].pF(),
                flkr_clri: t.flicker_color.split(",")[0],
                flkr_clro: t.flicker_color.split(",")[1],
                b_bdr_ri: t.border_radius.split(",")[0].pF() + "px",
                b_bdr_ro: t.border_radius.split(",")[1].pF() + "px",
                b_bdr_szi: t.border_size.split(",")[0].pF() + "px",
                b_bdr_szo: t.border_size.split(",")[1].pF() + "px",
                b_bdr_clri: t.border_color.split(",")[0],
                b_bdr_clro: t.border_color.split(",")[1],
                flkr_grad_szi: t.flicker_gradient ? t.flicker_gradient.split(",")[0].pF() : false,
                flkr_grad_szo: t.flicker_gradient ? t.flicker_gradient.split(",")[1].pF() : false,
                grad_pti: t.gradient_points.split(",")[0].pF(),
                grad_pto: t.gradient_points.split(",")[1].pF(),
                hideBS: t.hideBullets.isB(),
                iniW: e.outerWidth(),
                iniH: e.outerHeight(),
                t_offX: t.tooltip_offset.split(",")[0].pF(),
                t_offY: t.tooltip_offset.split(",")[1].pF(),
                tt_si: t.tooltip_speed.split(",")[0].pF(),
                tt_so: t.tooltip_speed.split(",")[1].pF(),
                tt_clse: t.tooltip_close === "hover" ? 1 : 2,
                pn_si: t.panel_speed.split(",")[0].pF(),
                pn_so: t.panel_speed.split(",")[1].pF(),
                p_x: t.panel_coords.split(",")[0].pF() + "%",
                p_y: t.panel_coords.split(",")[1].pF() + "%",
                path: t.path ? t.path.removeWS() : false,
                path_time: t.path_time.removeWS(),
                path_tip: t.path_tip ? t.path_tip.removeWS() : false,
                path_tip_offset: t.path_tip_offset ? t.path_tip_offset.removeWS() : false,
                loop_path: t.loop_path.isB()
            });
            if (t.flicker_image) e.data({
                flkr_clri: "transparent",
                flkr_clro: "transparent",
                flkr_ri: 0,
                flkr_ro: 0,
                b_bdr_szi: 0,
                b_bdr_szo: 0,
                b_bdr_ri: 0,
                b_bdr_ro: 0,
                b_bdr_clri: "transparent",
                b_bdr_clro: "transparent"
            });
            if (t.path_tip) t.tt_clse = 2
        }
    };
    e.fn.extend({
        Ani: function(t, n, r, i) {
            var s = e(this),
                o = "";
            if (e.support.SC.TRNS) {
                for (var u in t) {
                    if (t.hasOwnProperty(u)) o += "" + u + " " + n / 1e3 + "s " + r + " 0s,"
                }
                t.transition = o.replace(/,+$/, "");
                s.css(t).one(e.support.SC.TRANSEND, function(t) {
                    s.off(e.support.SC.TRANSEND);
                    if (typeof i === "function") i.apply(this, arguments);
                    t.stopPropagation()
                })
            } else {
                s.stop(true, false).animate(t, {
                    duration: n,
                    queue: false,
                    complete: function() {
                        if (typeof i === "function") i.apply(this, arguments)
                    }
                })
            }
            return s
        },
        PLY: function() {
            var t = e.support.SC.PRE + "animation-play-state";
            if (e.support.SC.ANI) return this.css(t, "running");
            return this
        },
        PSE: function() {
            var t = e.support.SC.PRE + "animation-play-state";
            if (e.support.SC.ANI) return this.css(t, "paused");
            return this
        }
    });
    e.fn.ShowCase = function(n, r) {
        if (t[n]) {
            return t[n].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof n === "object" || !n) {
            return t.init.apply(this, arguments)
        } else {
            e.error("Method " + n + " does not exist")
        }
    }
})(jQuery);
(function() {
    var e = document,
        t = e.body || e.documentElement,
        n = t.style,
        r = navigator.userAgent.toLowerCase(),
        i = false,
        s = undefined;
    $.support.SC = {
        ANI: n.animation !== s || n.WebkitAnimation !== s || n.MozAnimation !== s || n.msAnimation !== s || n.OAnimation !== s ? true : false,
        TRNS: n.transition !== s || n.WebkitTransition !== s || n.MozTransition !== s || n.msTransition !== s || n.OTransition !== s ? true : false,
        bgSize: n.backgroundSize !== s || n.WebkitBackgroundSize !== s || n.MozBackgroundSize !== s || n.msBackgroundSize !== s || n.OBackgroundSize !== s ? true : false,
        PRE: function() {
            if (/webkit/.test(r)) return "-webkit-";
            if (/mozilla/.test(r) && !/(compatible|webkit)/.test(r)) return "-moz-";
            if (/msie/.test(r) && !/opera/.test(r)) return "-ms-";
            if (/opera/.test(r)) return "-o-";
            return
        }(),
        isTablet: r.match(/iPad|Android|Kindle|NOOK|tablet/i) !== null,
        isMobile: function(e) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) i = true;
            return i
        }(r || navigator.vendor || window.opera)
    };
    $.support.SC.TRANSEND = function() {
        switch ($.support.SC.PRE) {
            case "-webkit-":
                return "webkitTransitionEnd";
                break;
            case "-o-":
                return "oTransitionEnd OTransitionEnd";
                break;
            case "-ms-":
                return "MSTransitionEnd transitionend";
                break;
            default:
                return "transitionend";
                break
        }
    }()
})()