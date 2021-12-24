<template>
  <h1 class="grey--text font-weight-bold text-subtitle-1 mb-5">
    {{ title }}
  </h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
