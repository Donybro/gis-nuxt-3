<template>
  <div class="container_wrapper">
    <Head>
      <Title>{{ $t('navbar.ozcom') }}</Title>
    </Head>
    <div class="grid grid-cols-12 gap-[24px] mt-[45px]">
      <div class="col-span-12 xl:col-span-9">
        <h1 class="section_title mb-[32px]">{{ surveyObject.title }}</h1>
        <p class="desc-html mb-[40px] !text-text_secondary w-full text-[1em] leading-[22px] font-inter break-words"
           v-html="surveyObject.description"></p>
        <div class="flex flex-col gap-[18px]">
          <div v-for="(question,indx) in surveyObject.questions" :key="question.id" class="">
            <div class="flex flex-col gap-[8px]">
              <h1 class="text-[1.12em] text-white font-medium font-montserrat leading-[25px]">
                {{ `${indx + 1} ${question.title}` }}
              </h1>
              <div v-if="question.type === $options.questionTypes.button" class="flex items-center gap-[10px]">
                <button v-for="opt in question.options"
                        :key="opt.id"
                        :class="surveyAnswerData[question.id] === opt.id ? 'bg-white text-primary':'bg-primary text-white'"
                        class="py-[12px] px-[18px] border border-white font-inter font-medium text-[1em] hover:bg-white hover:text-primary"
                        type="button"
                        @click="setButtonAnswer(question.id,opt.id)"
                >
                  {{ opt.title }}
                </button>
                <div v-show="notAnsweredQuestions.includes(question.id)" :id="question.id"
                     class="error_message h-[12px]">
                  {{ $t('validator.field-required') }}
                </div>
              </div>
              <div v-if="question.type === $options.questionTypes.text">
                <input v-model="surveyAnswerData[question.id]"
                       :placeholder="$t('form.write-answer')"
                       class="base_input w-full"
                       type="text" @input="setTextAnswer(question.id,$event.target.value)">
                <div v-show="notAnsweredQuestions.includes(question.id)" :id="question.id"
                     class="error_message h-[12px]">
                  {{ $t('validator.field-required') }}
                </div>
              </div>
              <div v-if="question.type === $options.questionTypes.radio" class="flex flex-col gap-[16px]">
                <div v-for="opt in question.options" :key="opt.id" class="">
                  <div class="flex flex-col md:flex-row flex-wrap gap-[10px]">
                    <div class="flex items-center gap-[10px]">
                      <input :id="opt.id"
                             :name="surveyAnswerData[question.id]"
                             v-model="questionsModels[question.id]"
                             :value="opt.id"
                             class="cursor-pointer w-[20px] h-[20px]"
                             type="radio"
                             @input="setRadioAnswer(question.id,$event.target.value,opt.with_input ? 'radio-text' :'radio',opt.with_input)"/>
                      <label :for="opt.id"
                             class="font-inter text-[1.12em] leading-[24px] text-text_secondary cursor-pointer">{{
                        opt.title }}</label>
                    </div>
                    <input v-if="opt.with_input && surveyAnswerData[question.id]?.answer_id === opt.id"
                           class="base_input w-full mb-[12px]"
                           type="text"
                           @input="setTextAnswer(question.id,$event.target.value,'radio-text',true,true)"
                    />
                  </div>
                </div>
                <button v-if="radioTextData[question.id] === 'radio' || radioTextData[question.id] === 'with_input'"
                        class="text-text_secondary border border-text_secondary w-[100px]"
                        @click.stop="deleteAnswer(question.id)">
                  {{ $t('button.cancel') }}
                </button>
                <div v-show="notAnsweredQuestions.includes(question.id)" :id="question.id"
                     class="error_message h-[12px]">
                  {{ $t('validator.field-required') }}
                </div>
              </div>
              <div v-if="question.type === $options.questionTypes.radio_text" class="flex flex-col gap-[16px]">
                <input v-if="radioTextData[question.id] === 'text' || !radioTextData[question.id]"
                       :placeholder="$t('form.write-answer')"
                       class="base_input w-full mb-[12px]"
                       type="text"
                       @input="setTextAnswer(question.id,$event.target.value,'radio-text',false)"
                >
                <div v-for="opt in question.options"
                     v-if="radioTextData[question.id] === 'radio' || radioTextData[question.id] === 'with_input' || !radioTextData[question.id]"
                     :key="opt.id" class=""
                >
                  <div class="flex flex-col md:flex-row flex-wrap gap-[10px]">
                    <div class="flex items-center gap-[10px]">
                      <input :id="opt.id"
                             :value="opt.id" class="cursor-pointer w-[20px] h-[20px]"
                             type="radio"
                             v-model="questionsModels[question.id]"
                             :name="surveyAnswerData[question.id]"
                             @input="setRadioAnswer(question.id,$event.target.value,'radio-text',opt.with_input)"
                      />
                      <label :for="opt.id"
                             class="font-inter text-[1.12em] leading-[24px] text-text_secondary cursor-pointer">
                        {{ opt.title }}
                      </label>
                    </div>
                    <input v-if="opt.with_input && surveyAnswerData[question.id]?.answer_id === opt.id"
                           class="base_input w-full mb-[12px]"
                           type="text"
                           @input="setTextAnswer(question.id,$event.target.value,'radio-text',!!question.options.find(el=>el.with_input),true)"
                    />
                  </div>
                </div>
                <button v-if="radioTextData[question.id] === 'radio' || radioTextData[question.id] === 'with_input'"
                        class="text-text_secondary border border-text_secondary w-[100px]"
                        @click.stop="deleteAnswer(question.id)">
                  {{ $t('button.cancel') }}
                </button>
                <div v-show="notAnsweredQuestions.includes(question.id)" :id="question.id"
                     class="error_message h-[12px]">
                  {{ $t('validator.field-required') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-[40px]">
          <button
              class="px-[30px] py-[12px] border border-white font-inter font-medium text-[1em] hover:bg-white text-white hover:text-primary"
              @click.stop="sendAnswers">
            {{ $t("button.send") }}
          </button>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </div>
</template>
<!--v-if="surveyAnswerResults.find(answer=>answer.question_id===q_id)"-->
<script>
import {answerToSurveyList, getSurveyList} from "../../api/survey";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";

export default {
  name: 'Survey',
  inject: ['$swal'],
  components: {SideMenuNavigator},
  questionTypes: {
    button: 'Кнопка',
    text: 'Текст',
    radio: 'Кнопка переключения',
    radio_text: 'Кнопка переключения и текст',
  },
  data() {
    return {
      surveyObject: {
        title: '',
        description: '',
        questions: []
      },
      surveyAnswerData: {},
      surveyAnswerResults: [],
      allAnsweredQuestions: [],
      radioTextData: {},
      notAnsweredQuestions: [],
      locale: this.$i18n,
      questionsModels: {},
      validationMode: false
    }
  },
  methods: {
    async scrollToError(fieldName) {
      console.log(fieldName)
      let elem = window.document.getElementById(fieldName)
      await this.$nextTick()
      elem?.scrollIntoView({behavior: 'smooth', block: "center"});
    },
    async validateFields() {
      this.allAnsweredQuestions = this.surveyAnswerResults.map(a => a.question)
      this.notAnsweredQuestions = this.surveyObject.questions.filter(q => !this.allAnsweredQuestions.includes(q.id)).map(a => a.id)
      await this.$nextTick()
      await this.scrollToError(this.notAnsweredQuestions[0])
      this.validationMode = false
    },
    async validateField(id) {
      let index = this.notAnsweredQuestions.indexOf(id)
      if (this.notAnsweredQuestions.includes(id) && index > -1) {
        this.notAnsweredQuestions.splice(index, 1)
      }
    },
    setTextAnswer(question_id, text, type, with_input, is_typing_input) {
      this.validateField(question_id)
      if (with_input) {
        if (this.surveyAnswerData[question_id]) {
          this.surveyAnswerData[question_id] = {...this.surveyAnswerData[question_id], text}
        } else {
          this.surveyAnswerData[question_id] = {text}
        }
      } else {
        this.surveyAnswerData[question_id] = text
      }
      this.pushToSurveyResults(question_id, text, 'answer_text', with_input)
      if (type === 'radio-text') {
        if (with_input) {
          this.radioTextData[question_id] = 'with_input'
        } else {
          this.radioTextData[question_id] = 'text'
        }
        if (text === '') {
          if (is_typing_input) {
            this.radioTextData[question_id] = 'radio'
          } else {
            this.radioTextData[question_id] = ''
          }
        }
      }
    },
    setRadioAnswer(question_id, answer_id, type, with_input) {
      this.validateField(question_id)
      if (with_input) {
        if (this.surveyAnswerData[question_id] && (this.surveyAnswerData[question_id]?.answer_id || this.surveyAnswerData[question_id]?.text)) {
          this.surveyAnswerData[question_id] = {...this.surveyAnswerData[question_id], answer_id}
        } else {
          this.surveyAnswerData[question_id] = {answer_id}
        }
      } else {
        this.surveyAnswerData[question_id] = answer_id
      }
      this.pushToSurveyResults(question_id, answer_id, 'answer', with_input)
      if (type === 'radio-text') {
        if (with_input) {
          this.radioTextData[question_id] = 'with_input'
        } else {
          this.radioTextData[question_id] = 'radio'
        }
        if (answer_id === '') {
          this.radioTextData[question_id] = ''
        }
      }

    },
    deleteAnswer(question_id) {
      this.surveyAnswerResults = this.surveyAnswerResults.filter(surv => surv.question !== question_id)
      delete this.surveyAnswerData[question_id]
      delete this.radioTextData[question_id]
      delete this.questionsModels[question_id]
    },
    setButtonAnswer(question_id, answer_id) {
      this.validateField(question_id)
      this.surveyAnswerData[question_id] = answer_id
      this.pushToSurveyResults(question_id, answer_id, 'answer')
    },
    pushToSurveyResults(question_id, answer, type, with_input) {
      let existAnswerObjIndex = this.surveyAnswerResults.map((e) => e.question).indexOf(question_id);
      if (existAnswerObjIndex !== -1) {
        if (type === 'answer_text' && answer === '') {
          this.surveyAnswerResults = this.surveyAnswerResults.filter((res) => res.question !== question_id)
        } else {
          if (with_input) {
            this.surveyAnswerResults[existAnswerObjIndex] = {
              ...this.surveyAnswerResults[existAnswerObjIndex],
              question: question_id,
              [type]: answer
            }
          } else {
            this.surveyAnswerResults[existAnswerObjIndex] = {question: question_id, [type]: answer}
          }
        }
      } else {
        this.surveyAnswerResults.push({question: question_id, [type]: answer})
      }
    },
    clearForm() {
      this.surveyAnswerData = {}
      this.radioTextData = {}
      this.questionsModels = {}
      this.surveyAnswerResults = []
    },
    async sendAnswers() {
      if (this.surveyObject.questions.length !== this.surveyAnswerResults.length) {
        this.validationMode = true
        await this.validateFields()
      } else {
        try {
          await answerToSurveyList(JSON.stringify(this.surveyAnswerResults, null, 1))
          this.$swal.fire({
            color: '#A2A0B3',
            background: '#3A2F7D',
            timerProgressBar: true,
            icon: 'success',
            title: this.$t('modal.thanks-for-participating-survey'),
            timer: 5500,
            showConfirmButton: false,
            customClass: {
              timerProgressBar: 'swal_timerProgressBar',
              popup: 'swal_popup',
            },
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })
        } catch (e) {
          this.$swal.fire({
            color: '#A2A0B3',
            background: '#3A2F7D',
            timerProgressBar: true,
            icon: 'error',
            title: this.$t('modal.survey-not-answered'),
            timer: 5500,
            showConfirmButton: false,
            customClass: {
              timerProgressBar: 'swal_timerProgressBar',
              popup: 'swal_popup',
            },
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', swal.stopTimer)
              toast.addEventListener('mouseleave', swal.resumeTimer)
            }
          })
        } finally {
          this.clearForm()
        }
      }

    }
  },
  watch: {
    '$i18n.locale': async function (newVal, oldVal) {
      const resp = await getSurveyList(this.$route.path)
      console.log(resp)
      if (resp) {
        const {about_survey, survey} = resp
        const surveyFields = survey[0]
        this.surveyObject = {...about_survey, ...surveyFields}
        console.log(this.surveyObject)
      }
    },
    async validationMode(val) {
      await this.$nextTick()
      console.log(this.notAnsweredQuestions)
      await this.scrollToError(this.notAnsweredQuestions[0])
    },
    surveyAnswerData: {
      deep: true,
      // handler: function (val) {
      //   console.log('surveyAnswerData', val);
      // }
    },
    surveyAnswerResults: {
      deep: true,
      handler: function (val) {
        if (val.length && this.validationMode) {
          this.validateFields()
        }
      }
    },
    radioTextData: {
      deep: true,
      // handler: function (val) {
      //   console.log('radioTextData', val);
      // }
    },
  },
  async mounted() {
    const resp = await getSurveyList(this.$route.path)
    console.log(resp)
    if (resp) {
      const {about_survey, survey} = resp
      const surveyFields = survey[0]
      this.surveyObject = {...about_survey, ...surveyFields}
      console.log(this.surveyObject)
    }

  }
}
</script>

<style scoped>

</style>
