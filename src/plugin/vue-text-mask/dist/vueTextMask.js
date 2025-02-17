!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.vueTextMask = t())
    : (e.vueTextMask = t());
})(this, function() {
  return (function(e) {
    function t(n) {
      if (r[n]) return r[n].exports;
      var o = (r[n] = { exports: {}, id: n, loaded: !1 });
      return e[n].call(o.exports, o, o.exports, t), (o.loaded = !0), o.exports;
    }
    var r = {};
    return (t.m = e), (t.c = r), (t.p = ""), t(0);
  })([
    function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.conformToMask = void 0);
      var o =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          },
        i = r(2);
      Object.defineProperty(t, "conformToMask", {
        enumerable: !0,
        get: function() {
          return n(i).default;
        }
      });
      var a = r(5),
        u = n(a);
      t.default = {
        render: function(e) {
          var t = this;
          return e("input", {
            ref: "input",
            domProps: { value: this.value },
            attrs: this.$attrs,
            on: Object.assign(o({}, this.$listeners), {
              input: function(e) {
                return t.updateValue(e.target.value);
              }
            })
          });
        },
        name: "masked-input",
        inheritAttrs: !1,
        props: {
          value: { type: String, required: !1, default: "" },
          mask: { type: [Array, Function, Boolean, Object], required: !0 },
          guide: { type: Boolean, required: !1 },
          placeholderChar: { type: String, required: !1 },
          keepCharPositions: { type: Boolean, required: !1 },
          pipe: { type: Function, required: !1 },
          showMask: { type: Boolean, required: !1 }
        },
        mounted: function() {
          this.initMask();
        },
        methods: {
          createTextMaskInputElement: u.default,
          setTextMaskInputElement: function() {
            this.textMaskInputElement = this.createTextMaskInputElement(
              o({ inputElement: this.$refs.input }, this.$options.propsData)
            );
          },
          initMask: function() {
            this.setTextMaskInputElement(),
              this.textMaskInputElement.update(this.value);
          },
          bind: function() {
            this.setTextMaskInputElement(), this.updateValue(this.value);
          },
          updateValue: function(e) {
            this.textMaskInputElement.update(e),
              this.$emit("input", this.$refs.input.value);
          }
        },
        watch: {
          mask: function(e, t) {
            this.mask !== t && this.bind();
          },
          guide: function() {
            this.bind();
          },
          placeholderChar: function() {
            this.bind();
          },
          keepCharPositions: function() {
            this.bind();
          },
          pipe: function() {
            this.bind();
          },
          showMask: function() {
            this.bind();
          }
        }
      };
    },
    function(e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.placeholderChar = "_"),
        (t.strFunction = "function");
    },
    function(e, t, r) {
      "use strict";
      function n() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
          t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u,
          r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (!(0, i.isArray)(t)) {
          if (("undefined" == typeof t ? "undefined" : o(t)) !== a.strFunction)
            throw new Error(
              "Text-mask:conformToMask; The mask property must be an array."
            );
          (t = t(e, r)),
            (t = (0, i.processCaretTraps)(t).maskWithoutCaretTraps);
        }
        var n = r.guide,
          l = void 0 === n || n,
          f = r.previousConformedValue,
          d = void 0 === f ? s : f,
          c = r.placeholderChar,
          p = void 0 === c ? a.placeholderChar : c,
          h = r.placeholder,
          v = void 0 === h ? (0, i.convertMaskToPlaceholder)(t, p) : h,
          m = r.currentCaretPosition,
          y = r.keepCharPositions,
          g = l === !1 && void 0 !== d,
          b = e.length,
          k = d.length,
          C = v.length,
          x = t.length,
          P = b - k,
          M = P > 0,
          T = m + (M ? -P : 0),
          O = T + Math.abs(P);
        if (y === !0 && !M) {
          for (var w = s, S = T; S < O; S++) v[S] === p && (w += p);
          e = e.slice(0, T) + w + e.slice(T, b);
        }
        for (
          var j = e.split(s).map(function(e, t) {
              return { char: e, isNew: t >= T && t < O };
            }),
            V = b - 1;
          V >= 0;
          V--
        ) {
          var E = j[V].char;
          if (E !== p) {
            var _ = V >= T && k === x;
            E === v[_ ? V - P : V] && j.splice(V, 1);
          }
        }
        var A = s,
          N = !1;
        e: for (var I = 0; I < C; I++) {
          var q = v[I];
          if (q === p) {
            if (j.length > 0)
              for (; j.length > 0; ) {
                var F = j.shift(),
                  $ = F.char,
                  B = F.isNew;
                if ($ === p && g !== !0) {
                  A += p;
                  continue e;
                }
                if (t[I].test($)) {
                  if (y === !0 && B !== !1 && d !== s && l !== !1 && M) {
                    for (var R = j.length, J = null, W = 0; W < R; W++) {
                      var L = j[W];
                      if (L.char !== p && L.isNew === !1) break;
                      if (L.char === p) {
                        J = W;
                        break;
                      }
                    }
                    null !== J ? ((A += $), j.splice(J, 1)) : I--;
                  } else A += $;
                  continue e;
                }
                N = !0;
              }
            g === !1 && (A += v.substr(I, C));
            break;
          }
          A += q;
        }
        if (g && M === !1) {
          for (var D = null, z = 0; z < A.length; z++) v[z] === p && (D = z);
          A = null !== D ? A.substr(0, D + 1) : s;
        }
        return { conformedValue: A, meta: { someCharsRejected: N } };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            };
      t.default = n;
      var i = r(3),
        a = r(1),
        u = [],
        s = "";
    },
    function(e, t, r) {
      "use strict";
      function n() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : l.placeholderChar;
        if (!o(e))
          throw new Error(
            "Text-mask:convertMaskToPlaceholder; The mask property must be an array."
          );
        if (e.indexOf(t) !== -1)
          throw new Error(
            "Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n" +
              ("The placeholder character that was received is: " +
                JSON.stringify(t) +
                "\n\n") +
              ("The mask that was received is: " + JSON.stringify(e))
          );
        return e
          .map(function(e) {
            return e instanceof RegExp ? t : e;
          })
          .join("");
      }
      function o(e) {
        return (Array.isArray && Array.isArray(e)) || e instanceof Array;
      }
      function i(e) {
        return "string" == typeof e || e instanceof String;
      }
      function a(e) {
        return "number" == typeof e && void 0 === e.length && !isNaN(e);
      }
      function u(e) {
        return "undefined" == typeof e || null === e;
      }
      function s(e) {
        for (var t = [], r = void 0; (r = e.indexOf(d)), r !== -1; )
          t.push(r), e.splice(r, 1);
        return { maskWithoutCaretTraps: e, indexes: t };
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.convertMaskToPlaceholder = n),
        (t.isArray = o),
        (t.isString = i),
        (t.isNumber = a),
        (t.isNil = u),
        (t.processCaretTraps = s);
      var l = r(1),
        f = [],
        d = "[]";
    },
    function(e, t) {
      "use strict";
      function r(e) {
        var t = e.previousConformedValue,
          r = void 0 === t ? o : t,
          i = e.previousPlaceholder,
          a = void 0 === i ? o : i,
          u = e.currentCaretPosition,
          s = void 0 === u ? 0 : u,
          l = e.conformedValue,
          f = e.rawValue,
          d = e.placeholderChar,
          c = e.placeholder,
          p = e.indexesOfPipedChars,
          h = void 0 === p ? n : p,
          v = e.caretTrapIndexes,
          m = void 0 === v ? n : v;
        if (0 === s || !f.length) return 0;
        var y = f.length,
          g = r.length,
          b = c.length,
          k = l.length,
          C = y - g,
          x = C > 0,
          P = 0 === g,
          M = C > 1 && !x && !P;
        if (M) return s;
        var T = x && (r === l || l === c),
          O = 0,
          w = void 0,
          S = void 0;
        if (T) O = s - C;
        else {
          var j = l.toLowerCase(),
            V = f.toLowerCase(),
            E = V.substr(0, s).split(o),
            _ = E.filter(function(e) {
              return j.indexOf(e) !== -1;
            });
          S = _[_.length - 1];
          var A = a
              .substr(0, _.length)
              .split(o)
              .filter(function(e) {
                return e !== d;
              }).length,
            N = c
              .substr(0, _.length)
              .split(o)
              .filter(function(e) {
                return e !== d;
              }).length,
            I = N !== A,
            q =
              void 0 !== a[_.length - 1] &&
              void 0 !== c[_.length - 2] &&
              a[_.length - 1] !== d &&
              a[_.length - 1] !== c[_.length - 1] &&
              a[_.length - 1] === c[_.length - 2];
          !x &&
            (I || q) &&
            A > 0 &&
            c.indexOf(S) > -1 &&
            void 0 !== f[s] &&
            ((w = !0), (S = f[s]));
          for (
            var F = h.map(function(e) {
                return j[e];
              }),
              $ = F.filter(function(e) {
                return e === S;
              }).length,
              B = _.filter(function(e) {
                return e === S;
              }).length,
              R = c
                .substr(0, c.indexOf(d))
                .split(o)
                .filter(function(e, t) {
                  return e === S && f[t] !== e;
                }).length,
              J = R + B + $ + (w ? 1 : 0),
              W = 0,
              L = 0;
            L < k;
            L++
          ) {
            var D = j[L];
            if (((O = L + 1), D === S && W++, W >= J)) break;
          }
        }
        if (x) {
          for (var z = O, G = O; G <= b; G++)
            if (
              (c[G] === d && (z = G),
              c[G] === d || m.indexOf(G) !== -1 || G === b)
            )
              return z;
        } else if (w) {
          for (var H = O - 1; H >= 0; H--)
            if (l[H] === S || m.indexOf(H) !== -1 || 0 === H) return H;
        } else
          for (var K = O; K >= 0; K--)
            if (c[K - 1] === d || m.indexOf(K) !== -1 || 0 === K) return K;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = r);
      var n = [],
        o = "";
    },
    function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function o(e) {
        var t = { previousConformedValue: void 0, previousPlaceholder: void 0 };
        return {
          state: t,
          update: function(r) {
            var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : e,
              o = n.inputElement,
              l = n.mask,
              d = n.guide,
              m = n.pipe,
              g = n.placeholderChar,
              b = void 0 === g ? h.placeholderChar : g,
              k = n.keepCharPositions,
              C = void 0 !== k && k,
              x = n.showMask,
              P = void 0 !== x && x;
            if (
              ("undefined" == typeof r && (r = o.value),
              r !== t.previousConformedValue)
            ) {
              ("undefined" == typeof l ? "undefined" : s(l)) === y &&
                void 0 !== l.pipe &&
                void 0 !== l.mask &&
                ((m = l.pipe), (l = l.mask));
              var M = void 0,
                T = void 0;
              if (
                (l instanceof Array &&
                  (M = (0, p.convertMaskToPlaceholder)(l, b)),
                l !== !1)
              ) {
                var O = a(r),
                  w = o.selectionEnd,
                  S = t.previousConformedValue,
                  j = t.previousPlaceholder,
                  V = void 0;
                if (
                  ("undefined" == typeof l ? "undefined" : s(l)) ===
                  h.strFunction
                ) {
                  if (
                    ((T = l(O, {
                      currentCaretPosition: w,
                      previousConformedValue: S,
                      placeholderChar: b
                    })),
                    T === !1)
                  )
                    return;
                  var E = (0, p.processCaretTraps)(T),
                    _ = E.maskWithoutCaretTraps,
                    A = E.indexes;
                  (T = _), (V = A), (M = (0, p.convertMaskToPlaceholder)(T, b));
                } else T = l;
                var N = {
                    previousConformedValue: S,
                    guide: d,
                    placeholderChar: b,
                    pipe: m,
                    placeholder: M,
                    currentCaretPosition: w,
                    keepCharPositions: C
                  },
                  I = (0, c.default)(O, T, N),
                  q = I.conformedValue,
                  F =
                    ("undefined" == typeof m ? "undefined" : s(m)) ===
                    h.strFunction,
                  $ = {};
                F &&
                  (($ = m(q, u({ rawValue: O }, N))),
                  $ === !1
                    ? ($ = { value: S, rejected: !0 })
                    : (0, p.isString)($) && ($ = { value: $ }));
                var B = F ? $.value : q,
                  R = (0, f.default)({
                    previousConformedValue: S,
                    previousPlaceholder: j,
                    conformedValue: B,
                    placeholder: M,
                    rawValue: O,
                    currentCaretPosition: w,
                    placeholderChar: b,
                    indexesOfPipedChars: $.indexesOfPipedChars,
                    caretTrapIndexes: V
                  }),
                  J = B === M && 0 === R,
                  W = P ? M : v,
                  L = J ? W : B;
                (t.previousConformedValue = L),
                  (t.previousPlaceholder = M),
                  o.value !== L && ((o.value = L), i(o, R));
              }
            }
          }
        };
      }
      function i(e, t) {
        document.activeElement === e &&
          (g
            ? b(function() {
                return e.setSelectionRange(t, t, m);
              }, 0)
            : e.setSelectionRange(t, t, m));
      }
      function a(e) {
        if ((0, p.isString)(e)) return e;
        if ((0, p.isNumber)(e)) return String(e);
        if (void 0 === e || null === e) return v;
        throw new Error(
          "The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n " +
            JSON.stringify(e)
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          },
        s =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              };
      t.default = o;
      var l = r(4),
        f = n(l),
        d = r(2),
        c = n(d),
        p = r(3),
        h = r(1),
        v = "",
        m = "none",
        y = "object",
        g =
          "undefined" != typeof navigator &&
          /Android/i.test(navigator.userAgent),
        b =
          "undefined" != typeof requestAnimationFrame
            ? requestAnimationFrame
            : setTimeout;
    }
  ]);
});
