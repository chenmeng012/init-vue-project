<template>
  <div class="hello">
    <h1 @click="handleClick">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      msg: 'To Link Admin'
    }
  },
  methods: {
    handleClick() {
      this.$router.push({name: 'home-admin'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
