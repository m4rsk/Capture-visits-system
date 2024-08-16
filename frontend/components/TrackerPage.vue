<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  name: 'TrackerPage',
  mounted() {
    (function (d, w) {
      var n = d.getElementsByTagName("script")[0],
      s = d.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "http://188.225.24.191/pixel.js?ref=" + d.referrer + "&page=" + encodeURIComponent(w.location.href);
      n.parentNode.insertBefore(s, n);
    })(document, window);
  }
};
</script>
