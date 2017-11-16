const QiitaBaseUrl = "https://qiita.com/api/v2/";

function buildUrl (section) {
  return QiitaBaseUrl + section
};

const app = new Vue({
  el: '#app',
  data: {
    results: []
  },
  mounted() {
    this.getPosts('items');
  },
  methods: {
    getPosts(section) {
      let url = buildUrl(section);
      axios.get(url)
      .then(response => { this.results = response.data })
    }
  }
});
