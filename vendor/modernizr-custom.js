/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-backgroundcliptext-setclasses !*/
!(function(e, n, t) {
  function o(e, n) {
    return typeof e === n
  }
  function r() {
    var e, n, t, r, s, i, a
    for (var l in C)
      if (C.hasOwnProperty(l)) {
        if (
          ((e = []),
          (n = C[l]),
          n.name &&
            (e.push(n.name.toLowerCase()),
            n.options && n.options.aliases && n.options.aliases.length))
        )
          for (t = 0; t < n.options.aliases.length; t++)
            e.push(n.options.aliases[t].toLowerCase())
        for (r = o(n.fn, 'function') ? n.fn() : n.fn, s = 0; s < e.length; s++)
          (i = e[s]),
            (a = i.split('.')),
            1 === a.length
              ? (x[a[0]] = r)
              : (!x[a[0]] ||
                  x[a[0]] instanceof Boolean ||
                  (x[a[0]] = new Boolean(x[a[0]])),
                (x[a[0]][a[1]] = r)),
            g.push((r ? '' : 'no-') + a.join('-'))
      }
  }
  function s(e) {
    var n = S.className,
      t = x._config.classPrefix || ''
    if ((b && (n = n.baseVal), x._config.enableJSClass)) {
      var o = new RegExp('(^|\\s)' + t + 'no-js(\\s|$)')
      n = n.replace(o, '$1' + t + 'js$2')
    }
    x._config.enableClasses &&
      ((n += ' ' + t + e.join(' ' + t)),
      b ? (S.className.baseVal = n) : (S.className = n))
  }
  function i(e, n) {
    return !!~('' + e).indexOf(n)
  }
  function a() {
    return 'function' != typeof n.createElement
      ? n.createElement(arguments[0])
      : b
      ? n.createElementNS.call(n, 'http://www.w3.org/2000/svg', arguments[0])
      : n.createElement.apply(n, arguments)
  }
  function l(e) {
    return e
      .replace(/([a-z])-([a-z])/g, function(e, n, t) {
        return n + t.toUpperCase()
      })
      .replace(/^-/, '')
  }
  function f(e, n) {
    return function() {
      return e.apply(n, arguments)
    }
  }
  function u(e, n, t) {
    var r
    for (var s in e)
      if (e[s] in n)
        return t === !1
          ? e[s]
          : ((r = n[e[s]]), o(r, 'function') ? f(r, t || n) : r)
    return !1
  }
  function c(e) {
    return e
      .replace(/([A-Z])/g, function(e, n) {
        return '-' + n.toLowerCase()
      })
      .replace(/^ms-/, '-ms-')
  }
  function d() {
    var e = n.body
    return e || ((e = a(b ? 'svg' : 'body')), (e.fake = !0)), e
  }
  function p(e, t, o, r) {
    var s,
      i,
      l,
      f,
      u = 'modernizr',
      c = a('div'),
      p = d()
    if (parseInt(o, 10))
      for (; o--; )
        (l = a('div')), (l.id = r ? r[o] : u + (o + 1)), c.appendChild(l)
    return (
      (s = a('style')),
      (s.type = 'text/css'),
      (s.id = 's' + u),
      (p.fake ? p : c).appendChild(s),
      p.appendChild(c),
      s.styleSheet
        ? (s.styleSheet.cssText = e)
        : s.appendChild(n.createTextNode(e)),
      (c.id = u),
      p.fake &&
        ((p.style.background = ''),
        (p.style.overflow = 'hidden'),
        (f = S.style.overflow),
        (S.style.overflow = 'hidden'),
        S.appendChild(p)),
      (i = t(c, e)),
      p.fake
        ? (p.parentNode.removeChild(p), (S.style.overflow = f), S.offsetHeight)
        : c.parentNode.removeChild(c),
      !!i
    )
  }
  function m(n, o) {
    var r = n.length
    if ('CSS' in e && 'supports' in e.CSS) {
      for (; r--; ) if (e.CSS.supports(c(n[r]), o)) return !0
      return !1
    }
    if ('CSSSupportsRule' in e) {
      for (var s = []; r--; ) s.push('(' + c(n[r]) + ':' + o + ')')
      return (
        (s = s.join(' or ')),
        p(
          '@supports (' + s + ') { #modernizr { position: absolute; } }',
          function(e) {
            return 'absolute' == getComputedStyle(e, null).position
          }
        )
      )
    }
    return t
  }
  function h(e, n, r, s) {
    function f() {
      c && (delete z.style, delete z.modElem)
    }
    if (((s = !o(s, 'undefined') && s), !o(r, 'undefined'))) {
      var u = m(e, r)
      if (!o(u, 'undefined')) return u
    }
    for (var c, d, p, h, v, y = ['modernizr', 'tspan']; !z.style; )
      (c = !0), (z.modElem = a(y.shift())), (z.style = z.modElem.style)
    for (p = e.length, d = 0; p > d; d++)
      if (
        ((h = e[d]),
        (v = z.style[h]),
        i(h, '-') && (h = l(h)),
        z.style[h] !== t)
      ) {
        if (s || o(r, 'undefined')) return f(), 'pfx' != n || h
        try {
          z.style[h] = r
        } catch (g) {}
        if (z.style[h] != v) return f(), 'pfx' != n || h
      }
    return f(), !1
  }
  function v(e, n, t, r, s) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
      a = (e + ' ' + P.join(i + ' ') + i).split(' ')
    return o(n, 'string') || o(n, 'undefined')
      ? h(a, n, r, s)
      : ((a = (e + ' ' + E.join(i + ' ') + i).split(' ')), u(a, n, t))
  }
  function y(e, n, o) {
    return v(e, t, t, n, o)
  }
  var g = [],
    C = [],
    w = {
      _version: '3.2.0',
      _config: {
        classPrefix: '',
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function(e, n) {
        var t = this
        setTimeout(function() {
          n(t[e])
        }, 0)
      },
      addTest: function(e, n, t) {
        C.push({ name: e, fn: n, options: t })
      },
      addAsyncTest: function(e) {
        C.push({ name: null, fn: e })
      }
    },
    x = function() {}
  ;(x.prototype = w), (x = new x())
  var S = n.documentElement,
    b = 'svg' === S.nodeName.toLowerCase(),
    _ = 'Moz O ms Webkit',
    P = w._config.usePrefixes ? _.split(' ') : []
  w._cssomPrefixes = P
  var E = w._config.usePrefixes ? _.toLowerCase().split(' ') : []
  w._domPrefixes = E
  var k = { elem: a('modernizr') }
  x._q.push(function() {
    delete k.elem
  })
  var z = { style: k.elem.style }
  x._q.unshift(function() {
    delete z.style
  }),
    (w.testAllProps = v),
    (w.testAllProps = y),
    x.addTest('backgroundcliptext', function() {
      return y('backgroundClip', 'text')
    }),
    r(),
    s(g),
    delete w.addTest,
    delete w.addAsyncTest
  for (var N = 0; N < x._q.length; N++) x._q[N]()
  e.Modernizr = x
})(window, document)
