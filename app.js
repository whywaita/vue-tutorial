const QiitaBaseUrl = "https://qiita.com/api/v2/";

function buildUrl (section) {
  return QiitaBaseUrl + section
};

function cutSection (body) {
  return body.substr(0, 20)
};

function cutTitle (title) {
  if (title.length - 1 <= 35) {
    return title
  }
  return title.substr(0, 35) + "..."
};

Vue.component('item-list', {
  props: ['results'],
  template:`
  <section>
    <div class="row" v-for="posts in processedPosts">
     <div class="columns medium-3 medium-6" v-for="post in posts">
       <div class="card">
         <div class="card-divider">
          <a :href="post.url" target="_blank">{{ post.title }}</a>
         </div>
         <img :src="post.image_url" width="200px" height="200px">
         <div class="card-section">
           <p>{{ post.outline }}</p>
         </div>
       </div>
     </div>
    </div> 
  </section>
  `,
  computed: {
    processedPosts() {
      let posts = this.results;

      posts.map(post => {
        post.image_url = post.user.profile_image_url;
        post.outline = cutSection(post.rendered_body);
        post.title = cutTitle(post.title);
      });

      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
})

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
      .catch(error => { console.log(error);});
    }
  }
});
