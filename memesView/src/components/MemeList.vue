<template>
    <div class="meme-container">
        <div v-if="loading"> class="loading">Loadin...</div>
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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background-color: #f5f5f5;
    color: #333;
}

.header {
    background-color: #222;
    color: white;
    padding: 15px 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

.meme-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
}

.meme {
    background-color: white;
    flex-basis: calc(50% - 20px);
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s;
}

.meme:hover {
    transform: translateY(-5px);
}

.meme-img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-top: 10px;
}

.meme-title a {
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: #222;
    display: block;
    margin-top: 10px;
}

.meme-title a:hover {
    color: #007bff;
}

@media (max-width: 600px) {
    .meme {
        flex-basis: 100%;
    }
}
</style>