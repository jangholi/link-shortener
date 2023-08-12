<script setup lang="ts">
const slug = ref(useRoute().query?.slug as string || '')
const link = ref(process.dev ? 'https://example.com' : '')
const shortLink = ref('')

const linkRef = ref<{focus: () => void} | null>(null)
const shortLinkRef = ref<{focus: () => void} | null>(null)

const ToasterrorMessage = ref('')
const linkErrorMsg = ref('')
const slugErrorMsg = ref('')

const isCopied = ref(false)

const title = useState('title', () =>
   process.dev ? 'URL Shortner' : useRequestEvent()?.node.req.headers.host
)

const submit = async () => {
  shortLink.value = '';
  resetError();
  if(!validateForm()) return

  try {
    const res = await callApi();
    if (res && res.shortLink) {
      shortLink.value = res.shortLink
    }

    resetForm()

    await nextTick()
    if(shortLinkRef.value) {
      shortLinkRef.value?.focus()
    }

    if(process.client) {
      addConfetti();
    }

  } catch (err:any) {
    ToasterrorMessage.value = err.data?.message  || err.message;

    setTimeout(() => {
      ToasterrorMessage.value = ""
  }, 2000)
  }
}

const callApi = () => {
  return $fetch('/api/create', {
      method: 'POST',
      body: {
        link: link.value,
        slug: slug.value.toLowerCase()
      }
    })
}

const addConfetti = async() => {
  const { default: JSConfetti } = await import('js-confetti')
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti()
}

const copyShortenUrl = async () => {
  await navigator.clipboard.writeText(shortLink.value!).catch(() => {});
  isCopied.value = true 

  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

const resetForm = () => {
  link.value = '';
  slug.value = '';
}

const resetError = () => {
  linkErrorMsg.value = '';
  slugErrorMsg.value = '';
}

const validateForm = () => {
  if(validateSlug() && validateUrl()) {
    return true
  } 

  return false
}

const validateSlug = () => {
  if(slug.value === '') {
    slugErrorMsg.value = 'Fill the Slug'
    return false
  } 
  
  return true
}

const validateUrl = () => {
  const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

  if (link.value === '') {
    linkErrorMsg.value = 'Fill the link';
    return false
  } else if (!urlRegex.test(link.value)) {
    linkErrorMsg.value = 'Link format is not correct';
    return false
  } 
  
  return true
}

useSeoMeta({
  title: title.value,
  description: 'Simple URL shortener'
})

useServerHead({
  script: [{
    key: "analytics",
    src: "https://static.cloudflareinsights.com/beacon.min.js",
    defer: true,
    "data-cf-beacon": '{"token": "753e83ba394c4eaf994322a644a949c5"}',
  }],
})
</script>

<template>
  <div class="min-h-screen bg-gray-300 flex flex-col">
    <Toast :visible="!!ToasterrorMessage" :message="ToasterrorMessage" />

    <main>
      <div class="p-3 bg-slate-800 flex flex-col items-center min-h-[50vh]">
        <p class="text-white text-3xl py-6">
          {{ title }}
        </p>

        <div class="flex flex-col items-center w-full sm:w-1/3 py-14">
          <form class="text-center w-full" @submit.prevent="submit">
            <Input
              v-model="slug"
              placeholder="Slug"
              :errorMsg="slugErrorMsg"
              @keypress.enter ="validateSlug() && linkRef?.focus()"
              />

            <Input
              v-model="link"
              placeholder="https://"
              type="url"
              :errorMsg="linkErrorMsg"
              ref="linkRef"
              class="mt-3"
              />

              <button class="bg-white text-slate-800 max-w-xs p-3 rounded-sm mb-11 w-1/2 mt-3">Shorten Link</button>
          </form>

          <div class="text-white w-full" v-if="shortLink">
              <div class="w-3/4 inline-block">
                  <Input
                    v-model="shortLink"
                    placeholder="https://"
                    ref="shortLinkRef"                    
                    readonly
                  />
              </div>
              
              <button :class="isCopied ? 'text-green-600' : 'text-slate-800'" class="bg-white max-w-xs p-3 mb-11 w-1/4" @click="copyShortenUrl"> {{ isCopied ? 'Copied' : 'Copy' }} </button>
          </div>
        </div>
      </div>

    </main>
    <footer class="text-center mt-3 text-lg">
      If you have any complains or ideas, please contact us via 
      <a href="mailto:hi@ridam.to?subject=Ridam to sitet!&body=Hi, " class="text-slate-800 font-semibold">hi@ridam.to</a>
    </footer>
  </div>
</template>