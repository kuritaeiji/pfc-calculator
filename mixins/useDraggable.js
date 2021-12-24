export default {
  data () {
    return {
      isDragging: false,
      dragOptions: {
        animation: 200,
        delay: 50
      }
    }
  },
  computed: {
    dragClass () {
      return {
        cgrab: !this.isDragging,
        cgrabbing: this.isDragging
      }
    }
  },
  methods: {
    onStart () {
      this.isDragging = true
    },
    onEnd () {
      this.isDragging = false
    }
  }
}
