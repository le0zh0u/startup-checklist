<template>
  <q-page padding>
    <h1>
      {{$t('page-title')}}
    </h1>

    <q-card class="desc-card">
      <q-card-section>
        {{ $t('desc1')}}<br/>
        {{ $t('desc2')}}<br/>
        {{ $t('desc3')}}<br/>
        {{ $t('desc4')}}<br/>
      </q-card-section>
    </q-card>
    
    <p>
      {{$t('phase1')}}<br/>
      {{$t('phase2')}}<br/>
      {{$t('phase3')}}<span class="bold">{{$t('phase3-bold')}}</span>
    </p>
    <div v-for="(checkType, checkKey) in checkList" :key="checkType.type">
      <h2>
        {{$t('check-list['+checkKey+'].title')}}
      </h2>
      <div class="question-pannel" v-for="(question, questionIndex) in checkType.questionList" :key="question.index">
        <p>
          {{question.index}}.{{$t('check-list['+checkKey+'].questionList['+questionIndex+'].title')}}
        </p>
        <div class="q-gutter-sm" v-if="question.type == 'radio'">
          <q-radio v-model="question.data" val="true" label="是" />
          <q-radio v-model="question.data" val="false" label="否" />
        </div>
        <q-input v-else
          v-model="question.data"
          filled
          autogrow
          :hint="hintForamt(question.max)"
          :error-message="validateErrorMessageForamt(question.max)"
          :error="question.max != 0 && question.data.length > question.max"
        />
        <div class="note note-gray" v-if="question.tips.length > 0 || (question.alsoSee && question.alsoSee.length > 0)">
          <p class="note-title">TIPS</p>
          <div v-if="question.tips.length > 0">
            <p v-for="(tip, tipKey) in question.tips" :key="tipsKey(question.index, tipKey)" v-html="tip"/>
          </div>
           <div v-else-if="question.alsoSee.length > 0">
            <p>
              {{$t('see-also')}}<span v-for="(tip) in question.alsoSee" :key="tip.title"><a v-html="tip.title" :href="tip.url" target="_blank"/>&nbsp;&nbsp;&nbsp;</span>
            </p>
          </div>
          
        </div>
      </div>
    </div>

    <div class="content-bottom">
      <!-- <p>如果你已经完成了回答，可以添加 -->
      <q-btn @click="createFile" color="primary">{{$t('download-btn')}}</q-btn>
    </div>

    <q-separator />

    <q-card dark bordered class="bg-grey-9 privacy-card">
      <q-card-section>
        <div class="text-h6">{{$t('private-policy-title')}}</div>
        <!-- <div class="text-subtitle2">by John Doe</div> -->
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{$t('private-policy')}}
      </q-card-section>
    </q-card>
      
      <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="fas fa-angle-up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import { saveAs } from 'file-saver';

export default {
  name: 'HelloWorld',
  data () {
    return {
      text: '',
      checkList: [
        {
          type: 'product',
          title: '产品',
          questionList: [
            {
              index: 1,
              title: '您构建的是什么？',
              max: 70,
              data: '',
              tips:[]
            },
            {
              index: 2,
              title: '这是为谁提供？',
              max: 70,
              data: '',
              tips:[]
            },
            {
              index: 3,
              title: '对现状不满的本质是什么？如果他们阅读了这个回答，会说：“谢谢，我希望我能想到这样做”吗？',
              max: 240,
              data: '',
              tips:['<a style="color: #027be3;"href="https://twitter.com/benedictevans/status/1110538673873805314" target="_blank" >@benedictevans</a>: “The iTunes Store solved a user problem. So did the App Store. And so did Spotify and Apple Music, and indeed Apple News. But what user problem is solved by Apple’s commissioning TV shows?” ', '<a style="color: #027be3;"href="https://www.amazon.com/Effective-Executive-Definitive-Harperbusiness-Essentials/dp/0060833459/" target="_blank">Peter Drucker</a>: Is the product being designed for the customer, or at the customer?']
            },
            {
              index: 4,
              title: '以假想的目标客户的身份写一条推文，解释产品及它如何消除他们的不满。',
              max: 0,
              data: '',
              tips: ['<a style="color: #027be3;"href="https://twitter.com/BrianNorgard/status/1110915013085028353" target="_blank">@benedictevans</a>: No one cares about your product. Who built it, its features, the origin story — it’s all superfluous. People only find value in what your product can do for them right now. Save people time. Save people money. Give people an escape. The selfish hand will always govern. ', '<a style="color: #027be3;"href="https://www.amazon.com/Effective-Executive-Definitive-Harperbusiness-Essentials/dp/0060833459/" target="_blank">Peter Drucker</a>: Are you really doing the best you can to help the customer?']
            },
            {
              index: 5,
              title: '如果为你的产品的启动写一个博客文章标题。它是不是令人惊喜的？它是不是新颖的？你的目标客户想要点击它吗？他们想要分享这个链接吗？明天他们仍然想要分享它吗？',
              max: 70,
              data: '',
              tips: []
            },
            {
              index: 6,
              title: '写下产品的博客文章的第一段。它需要包含产品名称，这是什么产品的说明，目标市场，主要的好处，以及呼吁大家进行使用的文稿。',
              max: 240,
              data: '',
              tips: []
            },
            {
              index: 7,
              title: '你的目标客户关心的“衡量这款产品好坏的核心标准”是什么？你的产品是否在每个衡量标准上对其他的可用替代方案是占据优势的？',
              max: 240,
              data: '',
              tips:[],
              alsoSee: [{
                url: 'https://www.jwz.org/doc/worse-is-better.html',
                title: 'The Rise of Worse is Better'
              },{
                url: 'https://www.artima.com/weblogs/viewpost.jsp?thread=24807',
                title: 'Worse is worse'
              }]
            }
          ]
        },
        {
          type: 'growth',
          title: '增长',
          questionList: [
            {
              index: 8,
              title: '填写自下而上的市场规模等式：`NUM_USERS * ACV = MARKET_SIZE`。你产品的市场规模数量是可观的吗？如果你正在构建一些全新的东西，请找一个正确的参考对象。',
              max: 0,
              data: '',
              tips:[],
              alsoSee: [{
                url: 'https://wiki.lesswrong.com/wiki/Shut_up_and_multiply',
                title: 'Shut up and multiply'
              }]
            },
            {
              index: 9,
              title: '你哪些部分的目标客户受到了现状的限制，他们会欢迎有点缺陷的产品吗？',
              max: 140,
              data: '',
              tips:[]
            },
            {
              index: 10,
              title: '列出你的头10个目标用户',
              max: 240,
              data: '',
              tips:[]
            },
            {
              index: 11,
              title: '在获得头10名用户后，你将如何来吸引之后的客户？',
              max: 240,
              data: '',
              tips: [],
              alsoSee: [{
                url: 'http://christophjanz.blogspot.com/2014/10/five-ways-to-build-100-million-business.html',
                title: 'Five ways to build a $100 million business'
              }]
            },
            {
              index: 12,
              title: '为了在18个月内能获得基本无限的资本，你需要完成哪些？你将如何完成它？',
              max: 240,
              data: '',
              tips: []
            }
          ]
        },
        {
          type: 'strategy',
          title: '策略',
          questionList: [
            {
              index: 13,
              title: '为什么是现在？ 至今导致其他人没有想到的/想通的原因是什么？',
              max: 240,
              data: '',
              tips:[]
            },
            {
              index: 14,
              title: '在25年的时间范围内，你的公司最有志向且可实现的里程碑是什么？',
              max: 70,
              data: '',
              tips:[]
            },
            {
              index: 15,
              title: '你的产品是否可以可靠地发展到这个里程碑？',
              max: 0,
              data: '',
              tips:[],
              type: 'radio'
            },
            {
              index: 16,
              title: '以这个里程碑为目标，你下一步可行的发展是什么？它的下一个是什么？再下个是什么？',
              max: 240,
              data: '',
              tips: [],
              alsoSee: [{
                url: 'https://twitter.com/spakhm/status/1111411471869595648',
                title: 'Tesla master plan'
              },{
                url: 'https://twitter.com/stevesi/status/1111092932252041216',
                title: 'iPhone runs OSX'
              }]
            },
            {
              index: 17,
              title: '你将如何构建一个护城河（构建你的壁垒）？',
              max: 240,
              data: '',
              tips: [],
              alsoSee: [{
                url: 'https://hbr.org/1979/03/how-competitive-forces-shape-strategy',
                title: 'How Competitive Forces Shape Strategy'
              }]
            }
          ]
        },
        {
          type: 'meaning',
          title: '意义',
          questionList: [
            {
              index: 18,
              title: '达到你的25年里程碑对世界意味着什么？这个未来真的令人兴奋吗？你愿意花多少年的生命为了达到它？',
              max: 140,
              data: '',
              tips:[]
            },
            {
              index: 19,
              title: '如果已经有其他公司正在研究这个想法并不是你，你会怎么想？你会加入他们吗？',
              max: 0,
              data: '',
              tips:[],
              type: 'radio'
            },
            {
              index: 20,
              title: '想象一下，如果你失败了，正站在你的团队，投资人，家人和朋友面前，并且他们正在等你说话。你会说什么？如果失败是必然的，你还愿意为解决这个问题而努力吗？',
              max: 480,
              data: '',
              tips:[],
              alsoSee: [{
                url: 'https://twitter.com/statsepi/status/1021334815822548992',
                title: 'Your intervention won\'t work'
              }]
            }
          ]
        },
        {
          type: 'bonus',
          title: '奖金',
          questionList: [
            {
              index: 21,
              title: '你的公司的股票代码是什么？',
              max: 0,
              data: '',
              tips:['<a style="color: #027be3;"href="https://twitter.com/sama/status/571733273996488704" target="_blank">sama</a>: It\'s easy/fun to say every new startup you hear about is bad. you will usually be right. you will never be successful.']
            },
            {
              index: 22,
              title: '它是否可能会成为从今年开始最重要的公司？',
              max: 0,
              data: '',
              tips:['George Orwell: Whoever is winning at the moment will always seem to be invincible.']
            }
          ]
        }
      ]
    }
  },
  methods: {
    tipsKey(questionIndex, tipIndex) {
      return questionIndex + '.' + tipIndex
    },
    hintForamt(max){
      return max == 0 ? this.$t('no-length-limit') : this.$t('max-limit', { maxLimit: ''+max })
    },
    validateErrorMessageForamt(max){
      return max == 0 ? "" : this.$t('max-error-message', {maxLimit: '' + max})
    },
    createFile: function () {
      var hasEmptyField = false
      this.checkList.forEach(data => {
        var filtered = data.questionList.filter(function (question) {
          return !question.data || question.data === '' || question.data.length == 0;
        })
        if(filtered.length > 0){
          hasEmptyField = true
          return ;
        } 
      })

      if(hasEmptyField){
        this.$q.notify({
          message: this.$t('has-empty-field'),
          color: 'red'
        })
        return;
      }
    
      var content = '[Startup CheckList](http://startup.leozhou.me/?ref=file)\n\n'
      this.checkList.forEach(data => {
        content = content.concat('## ', data.title, '\n')
        data.questionList.forEach(question => {
          content = content.concat('Q:',question.title, '\n', 'A:', question.data, '\n\n')
        })
      })
      var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "StartupCheckList.md");
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-page 
  padding: 16px 46px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

h1 
  font-size: 2rem;
  line-height: 2rem;
  padding: 1rem 0;
  font-weight: 500;
  margin: 0 0 1rem;

h2 
  font-size: 1.5rem;
  line-height: 1.5rem;
  padding: .5rem 0;
  font-weight: 500;
  border-bottom: 1px solid #ccc;
  margin: 3rem 0 1.5rem;

a
    color: #15792d;

.desc-card 
  margin-bottom: 3rem;

.privacy-card
  margin-top: 2rem;

.note 
  margin-bottom: 22px;
  background-color: #eee;
  border-radius: 4px;
  margin: 16px 0;
  padding: 16px 24px;
  font-size: 1em;
  border-width: 0 5px 0;
  border-style: solid;
  border-color: #9e9e9e;
  letter-spacing: .5px;

.note-gray 
  background-color: #e9e9e9;
  border-color: #E0E0E0;

.note-tip
  background-color: #c1f4cd;
  border-color: #21ba45;

.note-warning
  background-color: #f9e09b;
  border-color: #f2c037;

.note > p
  margin-bottom: 0; 
  color: rgba(0,0,0,0.54);

.note > p.note-title
  font-weight: 500;
  margin-bottom: 6px; 
  color: #000000;

.question-pannel 
  margin-bottom: 1rem;

.content-bottom
  margin-bottom: 1rem;

.bold 
  font-weight: bold
</style>