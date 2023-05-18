<template>
  <div class="text-sm">
    {{title}}
    <label :for="id">
    <p class="mt-2 flex items-center justify-center min-h-[50px] rounded-xl cursor-pointer bg-[#d3d3d3]"
      :class="text.isError ? 'border border-[#EE204D]' : ''"
      v-if="photo == null || text.isError">
      {{text.value}}
    </p>
    <img v-if="photo !== null && !text.isError" :src="photo" alt="" class="w-[200px] h-[200px] mx-auto cursor-pointer">
    </label>
    <input
      @change="sendfile"
      hidden="true"
      :id="id"
      type="file"
    />
  </div>
</template>
<script>
export default {
    name: 'InputFileComponent',
    props: ['title', 'id', 'fileName'],
    data() {
      return {
        text: {
          isError: false,
          value: 'Загрузите изображение'
        },
        photo: null
      }
    },
    methods: {
      sendfile(e) {
        let file = e.target.files[0]
        if(file.type.includes('image')) {
          this.text.value = 'Файл успешно загружен'
          this.text.isError = false
        } else {
          this.text.isError = true
          this.text.value =  'Выберите именно фото!'
        }
        let blob = file.slice(0, file.size, 'image/png')
        let newF = new File([blob], this.fileName, {type: 'image/png'})
        this.photo = URL.createObjectURL(file)
        this.$emit('sendFile', newF)
      },
    }
}
</script>
