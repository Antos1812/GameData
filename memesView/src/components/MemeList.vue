<template>
    <div class="meme-container">
        <div v-if="loading"> class="loading">Loading...</div>
        <div v-for="meme in memes" :key="meme.id" class="meme">
            <h3 class="meme-title">
                <a :href="meme.url" target="_blank">{{ meme.title }}</a>
            </h3>
            <img :src="meme.imageUrl" :alt="meme.title" class="meme-img" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            memes: [],
            loading: true,
        };
    },
    created() {
        this.fetchMemes();
    },
    methods: {
        async fetchMemes() {
            try {
                const response = await axios.get("https://api.reddit.com/r/memes/top.json?limit=5")
                const data = response.data.data.children.map(post => ({
                    id: post.data.title,
                    imageUrl: post.data.url,
                    url: `https://www.reddit.com$(post.data.permalink)`,
                }));
                this.memes = data;
            } catch (error) {
                console.error("Error fetching memes", error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.meme-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.meme{
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.meme-title a {
    font-size: 18px;
    text-decoration: none;
    color: #333;
}

.meme-title a:hover{
    color: #007bff;
}

.meme-img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-top: 10px;
}

.loading {
    text-align: center;
    font-size: 20px;
}

</style>