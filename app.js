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
      .catch( error => { console.log(error); });
    }
  },
  computed: {
    processedPosts() {
      let posts = this.results;

      posts.map(post => {
        post.image_url = post.image_url;
      });

      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
});
