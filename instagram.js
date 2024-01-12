const accessToken = 'EAAJy4ZC6DnFgBOZCNw4v0TcApjGTgmlZBKMQ9HR0UfglwpgTmff1FvRDsy82Vgf1G6UTnEfJ1dIpziXwFH71AZCregLuZB348eoOtZBVxpRo18Ot5LavvB6fqXQY1UGA4jyGBTLOrRVj4awMp4TkXJHpK5aZBfmZChaVXBxhsbY9vStW7UqPdE3pJHvMGT3q776hqvs0ZCLqQwGSTxNPfpDeA';  // Replace with your actual access token

function fetchInstagramPosts() {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`;

    fetch(url)
        .then(response => {
            console.log(response);  // Log the full response
            return response.json();
        })
        .then(data => {
            displayPosts(data.data);
        })
        .catch(error => {
            console.error('Error fetching Instagram posts:', error);
        });
}


function displayPosts(posts) {
    const container = document.getElementById('instagram-posts');
  
    posts.forEach(post => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-lg-4 col-md-4 col-sm-6 col-xs-12';
  
      const itemDiv = document.createElement('div');
      itemDiv.className = 'single-item';
  
      const imgBoxDiv = document.createElement('div');
      imgBoxDiv.className = 'img-box img-box-overlay';
  
      const img = document.createElement('img');
      img.src = post.media_url;
      img.alt = post.caption;
  
      imgBoxDiv.appendChild(img);
      itemDiv.appendChild(imgBoxDiv);
      colDiv.appendChild(itemDiv);
      container.appendChild(colDiv);


    });
  }
  

