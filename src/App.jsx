import { useState, useEffect } from "react";

const questions = [
  // Section 1
  {
    id: 1, section: "Section 1", sectionTitle: "might / could（可能性・柔らかい提案）",
    type: "rewrite",
    instruction: "より丁寧・控えめな表現に言い換えましょう",
    prompt: "You can do it.",
    hint: "できるかも？",
    modelAnswer: "You might be able to do it.",
    altAnswers: ["You could do it."],
    explanation: "can（できる）→ might / could（できるかも）で、断言を和らげます。"
  },
  {
    id: 2, section: "Section 1", sectionTitle: "might / could（可能性・柔らかい提案）",
    type: "rewrite",
    instruction: "より丁寧・控えめな表現に言い換えましょう",
    prompt: "You should try it.",
    hint: "〜した方がいいかも？",
    modelAnswer: "You might want to try it.",
    altAnswers: ["You could try it."],
    explanation: "should（〜すべき）→ might want to / could で柔らかい提案になります。"
  },
  {
    id: 3, section: "Section 1", sectionTitle: "might / could（可能性・柔らかい提案）",
    type: "rewrite",
    instruction: "より丁寧・控えめな表現に言い換えましょう",
    prompt: "It is possible.",
    hint: "かもしれない",
    modelAnswer: "It might be possible.",
    altAnswers: ["It could be possible."],
    explanation: "「可能だ」→「可能かもしれない」へ。might / could で推量に変わります。"
  },
  {
    id: 4, section: "Section 1", sectionTitle: "might / could（可能性・柔らかい提案）",
    type: "rewrite",
    instruction: "より丁寧・控えめな表現に言い換えましょう（少し引いた提案）",
    prompt: "Do you want to go?",
    hint: "少し引いた提案",
    modelAnswer: "Would you like to go?",
    altAnswers: ["Would you want to go?", "Might you want to go?"],
    explanation: "Do you want to → Would you like to で、ぐっと丁寧で控えめな誘い方になります。"
  },
  {
    id: 5, section: "Section 1", sectionTitle: "might / could（可能性・柔らかい提案）",
    type: "choice",
    instruction: "自然な返事を選びなさい",
    context: 'A: "Can you finish by tomorrow?"',
    choices: ["Yes, I can.", "I might be able to.", "I will."],
    correct: 1,
    explanation: "「できるかも」という余地を残した I might be able to. が最も自然。「Yes, I can.」は断言、「I will.」は意志の表明で、少し強すぎます。"
  },
  // Section 2
  {
    id: 6, section: "Section 2", sectionTitle: "過去形による心理的距離",
    type: "rewrite",
    instruction: "より丁寧・柔らかいバージョンに直しなさい",
    prompt: "I want to ask you something.",
    hint: "過去形で距離感を出す",
    modelAnswer: "I wanted to ask you something.",
    altAnswers: ["I was wondering if I could ask you something."],
    explanation: "want → wanted と過去形にするだけで、「ちょっと聞きたいんだけど…」という遠慮がちなニュアンスが生まれます。"
  },
  {
    id: 7, section: "Section 2", sectionTitle: "過去形による心理的距離",
    type: "rewrite",
    instruction: "より丁寧・柔らかいバージョンに直しなさい",
    prompt: "I hope you can come.",
    hint: "過去形で柔らかく",
    modelAnswer: "I was hoping you could come.",
    altAnswers: ["I hoped you could come."],
    explanation: "hope → was hoping、can → could で、「来てくれたらいいなと思ってて…」という柔らかさが出ます。"
  },
  {
    id: 8, section: "Section 2", sectionTitle: "過去形による心理的距離",
    type: "rewrite",
    instruction: "より丁寧・柔らかいバージョンに直しなさい",
    prompt: "I think this is better.",
    hint: "断言を和らげる",
    modelAnswer: "I thought this might be better.",
    altAnswers: ["I was thinking this might be better."],
    explanation: "think → thought / was thinking で、意見の押しつけ感がなくなります。"
  },
  {
    id: 9, section: "Section 2", sectionTitle: "過去形による心理的距離",
    type: "rewrite",
    instruction: "より丁寧なバージョンに直しなさい",
    prompt: "Can you help me?",
    hint: "丁寧なお願い",
    modelAnswer: "Could you help me?",
    altAnswers: ["Would you be able to help me?"],
    explanation: "can → could で、「お願いできますか？」という丁寧なニュアンスになります。"
  },
  {
    id: 10, section: "Section 2", sectionTitle: "過去形による心理的距離",
    type: "rewrite",
    instruction: "仮定法っぽいバージョンに直しなさい",
    prompt: "I will go if you go.",
    hint: "仮定法のニュアンス",
    modelAnswer: "I would go if you went.",
    altAnswers: ["I'd go if you went."],
    explanation: "will → would、go → went で、仮定法過去に変わり「あなたが行くなら行くんだけど…」という柔らかさが出ます。"
  },
  {
    id: 11, section: "Section 2", sectionTitle: "過去形による心理的距離",
    type: "explain",
    instruction: "なぜ過去形が使われているか説明しましょう",
    prompt: "I was wondering if you could help me.",
    modelAnswer: "現在の依頼なのに過去形を使うことで、現実から距離を置き、相手にプレッシャーを与えない丁寧な表現になるから。",
    explanation: "過去形＝心理的距離。「今お願いしている」のに was wondering / could と過去形にすることで、ワンクッション置いた丁寧さが生まれます。"
  },
  {
    id: 12, section: "Section 2", sectionTitle: "過去形による心理的距離",
    type: "explain",
    instruction: "なぜ過去形が使われているか説明しましょう",
    prompt: "I wanted to let you know…",
    modelAnswer: "want の過去形 wanted を使うことで、「お知らせしたかったんですが…」という遠慮がちで丁寧な前置きになるから。",
    explanation: "want → wanted で「言いたかったのですが…」という控えめな切り出し方に。断定を避けるクッション表現です。"
  },
  // Section 3
  {
    id: 13, section: "Section 3", sectionTitle: "be going to / was going to / supposed to",
    type: "fill",
    instruction: "適切な表現を選んで入れなさい",
    prompt: "I ________ call you, but I forgot.",
    hint: "しようとしてたけど…",
    choices: ["was going to", "am going to"],
    correct: 0,
    explanation: "was going to = 「〜するつもりだったのに（できなかった）」。過去の未実現の意図を表します。"
  },
  {
    id: 14, section: "Section 3", sectionTitle: "be going to / was going to / supposed to",
    type: "fill",
    instruction: "適切な表現を選んで入れなさい",
    prompt: "I ________ have to cancel the trip. The dates don't work.",
    hint: "やむを得ず…という未来が見えた",
    choices: ["'m gonna", "'m going to"],
    correct: 0,
    explanation: "I'm gonna have to... は「（状況的に）せざるを得ない」というニュアンス。gonna はくだけた spoken English の表現です。"
  },
  {
    id: 15, section: "Section 3", sectionTitle: "be going to / was going to / supposed to",
    type: "fill",
    instruction: "適切な表現を選んで入れなさい",
    prompt: "I ________ finish this by Friday.",
    hint: "〜することになっている",
    choices: ["am supposed to", "was supposed to"],
    correct: 0,
    explanation: "be supposed to = 「〜することになっている・〜するはずだ」。約束・予定・規則に使います。"
  },
  // Section 4
  {
    id: 16, section: "Section 4", sectionTitle: "条件文（現実との距離感）",
    type: "rewrite",
    instruction: "より現実味の薄い・丁寧なバージョンに変換しなさい",
    prompt: "I will go shopping later if it doesn't rain.",
    hint: "would / didn't を使う",
    modelAnswer: "I would go shopping later if it didn't rain.",
    altAnswers: ["I'd go shopping later if it didn't rain."],
    explanation: "will → would、doesn't → didn't で仮定法過去に。「雨が降らなければ行くんだけど（でも降りそう）」という現実味の薄いニュアンスになります。"
  },
  {
    id: 17, section: "Section 4", sectionTitle: "条件文（現実との距離感）",
    type: "rewrite",
    instruction: "より現実味の薄い・丁寧なバージョンに変換しなさい",
    prompt: "If you help me, I can finish faster.",
    hint: "would / could を使う",
    modelAnswer: "If you helped me, I could finish faster.",
    altAnswers: ["If you could help me, I would finish faster."],
    explanation: "help → helped、can → could で仮定法過去に。「もし手伝ってもらえたら…」という控えめな依頼のニュアンスが出ます。"
  },
  {
    id: 18, section: "Section 4", sectionTitle: "条件文（現実との距離感）",
    type: "choice",
    instruction: "状況に合う文を選びなさい",
    context: "状況：雨が降りそうだけど、まだわからない",
    prompt: "I ________ go if it ________ rain.",
    choices: ["will / doesn't", "would / didn't"],
    correct: 0,
    explanation: "「まだわからない」→ 現実の可能性なので will / doesn't（直説法）が正解。would / didn't は「ほぼ無理だろう」という仮定法のニュアンスになります。"
  },
  // Section 5
  {
    id: 19, section: "Section 5", sectionTitle: "総合練習（英作文）",
    type: "compose",
    instruction: "自然で心理的距離感のある英語にしましょう",
    prompt: "聞きたいことがあるんだけど…（少し遠慮がち）",
    modelAnswer: "I was wondering if I could ask you something.",
    altAnswers: ["I wanted to ask you something.", "I just wanted to ask you something."],
    explanation: "was wondering if I could... が最も丁寧。「ちょっとよろしいでしょうか」というニュアンスです。"
  },
  {
    id: 20, section: "Section 5", sectionTitle: "総合練習（英作文）",
    type: "compose",
    instruction: "自然で心理的距離感のある英語にしましょう",
    prompt: "行けたらいいんだけど（行けるかわからない）",
    modelAnswer: "I was hoping I could go.",
    altAnswers: ["I'd love to go if I can.", "I might be able to go."],
    explanation: "was hoping I could... で「行けたらよかったんだけど…」という不確かさと願望が伝わります。"
  },
  {
    id: 21, section: "Section 5", sectionTitle: "総合練習（英作文）",
    type: "compose",
    instruction: "自然で心理的距離感のある英語にしましょう",
    prompt: "ちょっと考えた方がいいかもよ（軽い提案）",
    modelAnswer: "You might want to think about it.",
    altAnswers: ["You could think about it.", "Maybe you should think about it."],
    explanation: "might want to で「〜した方がいいかもよ」という押しつけのない軽い提案になります。"
  },
  {
    id: 22, section: "Section 5", sectionTitle: "総合練習（英作文）",
    type: "compose",
    instruction: "自然で心理的距離感のある英語にしましょう",
    prompt: "連絡しようと思ってたんだけど、忘れてた。",
    modelAnswer: "I was going to contact you, but I forgot.",
    altAnswers: ["I was going to call you, but I forgot.", "I was going to text you but forgot."],
    explanation: "was going to + 動詞 で「〜するつもりだったんだけど」という未実現の意図が伝わります。"
  },
  {
    id: 23, section: "Section 5", sectionTitle: "総合練習（英作文）",
    type: "compose",
    instruction: "自然で心理的距離感のある英語にしましょう",
    prompt: "残念だけど、その旅行はキャンセルせざるを得ないかも。",
    modelAnswer: "Unfortunately, I might have to cancel the trip.",
    altAnswers: ["I'm afraid I'm gonna have to cancel the trip.", "I might have to cancel, unfortunately."],
    explanation: "I might have to... で「せざるを得ないかも」という残念な気持ちが伝わります。"
  },
  {
    id: 24, section: "Section 5", sectionTitle: "総合練習（英作文）",
    type: "compose",
    instruction: "自然で心理的距離感のある英語にしましょう",
    prompt: "手伝ってもらえたら助かるんだけど…（丁寧）",
    modelAnswer: "I was wondering if you could help me.",
    altAnswers: ["It would really help if you could assist me.", "Could you possibly help me?"],
    explanation: "was wondering if you could が最も丁寧な依頼表現のひとつ。「もしよければ…」というニュアンスです。"
  },
  // Section 6
  {
    id: 25, section: "Section 6", sectionTitle: "穴埋め総復習",
    type: "fill",
    instruction: "適切な形を入れなさい（過去形に注意）",
    prompt: "I ________ if you ________ give me some advice.",
    hint: "wonder / can を適切な形に",
    choices: ["was wondering / could", "wonder / can", "wondered / would"],
    correct: 0,
    explanation: "I was wondering if you could... が最も丁寧な依頼文。両方とも過去形にすることで心理的距離が生まれます。"
  },
  {
    id: 26, section: "Section 6", sectionTitle: "穴埋め総復習",
    type: "fill",
    instruction: "適切な形を入れなさい（過去形に注意）",
    prompt: "I ________ you ________ the gift.",
    hint: "hope / like を適切な形に",
    choices: ["was hoping / would like", "hope / like", "hoped / liked"],
    correct: 0,
    explanation: "I was hoping you would like... で「気に入ってもらえたらと思ってて…」という柔らかい気持ちが伝わります。"
  },
  {
    id: 27, section: "Section 6", sectionTitle: "穴埋め総復習",
    type: "fill",
    instruction: "適切な形を入れなさい",
    prompt: "We ________ have to leave early.",
    hint: "be going to の形を考えて",
    choices: ["are going to", "were going to", "was going to"],
    correct: 0,
    explanation: "We are going to have to leave early. = 「早く出なければならないことになりそう」。状況から生じる必然性を表します。"
  },
  {
    id: 28, section: "Section 6", sectionTitle: "穴埋め総復習",
    type: "fill",
    instruction: "適切な形を入れなさい（過去形に注意）",
    prompt: "I ________ to thank you for everything.",
    hint: "want を適切な形に",
    choices: ["wanted", "want", "would want"],
    correct: 0,
    explanation: "I wanted to thank you = 「お礼が言いたくて…」。want を過去形にするだけで、丁寧で控えめな前置き表現になります。"
  },
  {
    id: 29, section: "Section 6", sectionTitle: "穴埋め総復習",
    type: "fill",
    instruction: "適切な形を入れなさい",
    prompt: "It ________ be difficult sometimes.",
    hint: "can の適切な使い方",
    choices: ["can", "could", "might"],
    correct: 0,
    explanation: "It can be difficult sometimes. = 「時に難しいこともある」。一般的な可能性を表す can です。"
  },
  // 第1部
  {
    id: 30, section: "第1部", sectionTitle: "選択問題（距離感の理解）",
    type: "choice",
    instruction: "より自然・丁寧な表現を選びなさい",
    context: "友達に「この後、時間ある？」と少し控えめに聞きたいとき",
    choices: ["Do you have time?", "Did you have time?"],
    correct: 1,
    explanation: "Did you have time? と過去形にすることで、「もし時間があれば…」という遠慮がちなニュアンスが生まれます。直接すぎずちょうどいい距離感です。"
  },
  {
    id: 31, section: "第1部", sectionTitle: "選択問題（距離感の理解）",
    type: "choice",
    instruction: "より丁寧で控えめな印象を与える表現を選びなさい",
    context: "お店で「これ、試着できますか？」と聞く際",
    choices: ["Can I try this on?", "Could I try this on?"],
    correct: 1,
    explanation: "Could I は Can I を過去形にしたもの。can より丁寧で、店員さんへの配慮が伝わる表現です。"
  },
  {
    id: 32, section: "第1部", sectionTitle: "選択問題（距離感の理解）",
    type: "choice",
    instruction: "少しバツが悪そうに「キャンセルしなければならないかも」と伝えるのはどちら？",
    choices: ["I'm going to have to cancel.", "I'm gonna have to cancel."],
    correct: 1,
    explanation: "gonna はくだけた口語表現。「なんか…キャンセルしないといけなさそうで…」というバツの悪さや申し訳なさが滲む言い方です。"
  },
  // 第2部
  {
    id: 33, section: "第2部", sectionTitle: "英作文問題（距離感の調整）",
    type: "compose",
    instruction: "want を使って：押し付けたくない誘い方で「明日、映画に行かない？」",
    prompt: "【提案】相手に「明日、映画に行かない？」と誘いたいが、押し付けたくないとき。(want)",
    modelAnswer: "I was wondering if you'd want to go to a movie tomorrow.",
    altAnswers: ["Would you want to go to a movie tomorrow?", "Did you want to go to a movie tomorrow?"],
    explanation: "Would you want to / Did you want to で「よかったら映画どう？」という軽くて押しつけのない誘い方になります。"
  },
  {
    id: 34, section: "第2部", sectionTitle: "英作文問題（距離感の調整）",
    type: "compose",
    instruction: "could を使って：「誰か来たのかもね」",
    prompt: "【推量】誰かがドアをノックした。「誰か来たのかもね」と言いたいとき。(could)",
    modelAnswer: "That could be someone at the door.",
    altAnswers: ["It could be someone.", "Someone could be here."],
    explanation: "could be で「〜かもしれない」という推量を表します。might be でも同じような意味になります。"
  },
  {
    id: 35, section: "第2部", sectionTitle: "英作文問題（距離感の調整）",
    type: "compose",
    instruction: "wonder を使って：「ちょっと聞きたいことがあるんだけど…」",
    prompt: "【依頼】「ちょっと聞きたいことがあるんだけど…」と切り出したいとき。(wonder)",
    modelAnswer: "I was wondering if I could ask you something.",
    altAnswers: ["I wonder if I could ask you something."],
    explanation: "I was wondering if... は英語で最も丁寧な切り出し方のひとつ。日本語の「あのう、少しよろしいでしょうか」に相当します。"
  },
  {
    id: 36, section: "第2部", sectionTitle: "英作文問題（距離感の調整）",
    type: "compose",
    instruction: "was going to を使って：残念な気持ちを込めて「行く予定だったんだけど（行けなくなった）」",
    prompt: "【予定の変更】「行く予定だったんだけど（行けなくなった）」と言うとき。(was going to)",
    modelAnswer: "I was going to go, but I can't make it.",
    altAnswers: ["I was going to come, but something came up.", "I was going to be there but I can't now."],
    explanation: "was going to は「〜するつもりだったのに（できなかった）」という未実現の意図と残念な気持ちを同時に表します。"
  },
  // 第3部
  {
    id: 37, section: "第3部", sectionTitle: "思考トレーニング",
    type: "compose",
    instruction: "心理的距離を置いて柔らかく言い換えましょう",
    prompt: "Original: I want to ask you a question.\n→ より心理的距離を置いた表現に",
    modelAnswer: "I was wondering if I could ask you a question.",
    altAnswers: ["I wanted to ask you a question.", "I was hoping to ask you something."],
    explanation: "want → was wondering if I could で、現在の直接的な「聞きたい」から、遠慮がちな「聞けたらな…」へと距離が生まれます。"
  },
  {
    id: 38, section: "第3部", sectionTitle: "思考トレーニング",
    type: "compose",
    instruction: "「ひょっとしたらそうかも？」という推量に変えましょう",
    prompt: "Original: It is true.\n→ 「ひょっとしたらそうかも？」という推量に",
    modelAnswer: "It might be true.",
    altAnswers: ["It could be true.", "That might be the case."],
    explanation: "is → might be / could be で、事実の断言から「もしかしたら」という推量・可能性の表現に変わります。"
  },
  {
    id: 39, section: "第3部", sectionTitle: "思考トレーニング",
    type: "compose",
    instruction: "「助けられたらいいな（仮定のニュアンス）」に変えましょう",
    prompt: "Original: I will help you.\n→ 「助けられたらいいな（仮定のニュアンス）」に",
    modelAnswer: "I would help you if I could.",
    altAnswers: ["I'd love to help you if possible.", "I would help if I were able to."],
    explanation: "will → would で仮定法に。「できるなら助けたいんだけど」という願望と現実の距離が伝わります。"
  },
  // ─── Part II: Hedging ───
  {
    id: 40, section: "Part II-A", sectionTitle: "Hedging（言い切らない技術）",
    type: "rewrite",
    instruction: "断言を避けたHedging表現に言い換えましょう",
    prompt: "This is the best solution.",
    hint: "I think / I believe を使って",
    modelAnswer: "I think this might be the best solution.",
    altAnswers: ["I believe this could be the best solution.", "This seems like the best solution."],
    explanation: "断言（is）の前に I think / I believe を置き、might を加えると「私はこれが一番だと思うのですが」という控えめな提案になります。"
  },
  {
    id: 41, section: "Part II-A", sectionTitle: "Hedging（言い切らない技術）",
    type: "rewrite",
    instruction: "Hedging表現に言い換えましょう",
    prompt: "The results are wrong.",
    hint: "It seems / It appears を使って",
    modelAnswer: "It seems the results might be wrong.",
    altAnswers: ["It appears the results could be incorrect.", "The results seem to be off."],
    explanation: "It seems / It appears で「〜のようだ」という観察ベースの表現に。断罪ではなく気づきとして伝わります。"
  },
  {
    id: 42, section: "Part II-A", sectionTitle: "Hedging（言い切らない技術）",
    type: "choice",
    instruction: "より学術的・ビジネス的なHedging表現を選びなさい",
    context: "レポートで「この薬は効果がある」と主張したいが、断言は避けたい",
    choices: [
      "This drug works.",
      "This drug appears to have some effect.",
      "This drug is maybe working."
    ],
    correct: 1,
    explanation: "appears to have some effect が最も適切なHedging。「効果があるようだ」と証拠に基づいた慎重な主張になります。maybe は口語的でレポートには不向き。"
  },
  {
    id: 43, section: "Part II-A", sectionTitle: "Hedging（言い切らない技術）",
    type: "compose",
    instruction: "Hedgingを使って自然な英語にしましょう",
    prompt: "彼が間違っていると思う。（でも確信はない）",
    modelAnswer: "I think he might be wrong.",
    altAnswers: ["It seems like he could be mistaken.", "He appears to be wrong, but I'm not certain."],
    explanation: "I think + might で二重のHedgingに。「たぶん彼が間違ってると思うんだけど…」という慎重さが伝わります。"
  },
  {
    id: 44, section: "Part II-A", sectionTitle: "Hedging（言い切らない技術）",
    type: "rewrite",
    instruction: "Hedgingを使って柔らかく言い換えましょう",
    prompt: "Apparently, he didn't read it.",
    hint: "apparently の意味・ニュアンスを意識して",
    modelAnswer: "Apparently, he didn't read it.",
    altAnswers: ["It seems he may not have read it.", "From what I can tell, he didn't read it."],
    explanation: "Apparently は「人から聞いた話では」「どうやら〜らしい」というニュアンス。自分で確認していない情報を伝えるときの便利なHedging語です。"
  },
  {
    id: 45, section: "Part II-A", sectionTitle: "Hedging（言い切らない技術）",
    type: "fill",
    instruction: "最も自然なHedging語を選びなさい",
    prompt: "________ , the project will be delayed.",
    hint: "「どうやら〜らしい」",
    choices: ["Apparently", "Obviously", "Definitely"],
    correct: 0,
    explanation: "Apparently = 「どうやら・〜らしい」。情報の不確かさを示すHedging副詞です。Obviously（明らかに）やDefinitely（絶対に）は断言になってしまいます。"
  },

  // ─── Part II-B: 感情を薄める副詞 ───
  {
    id: 46, section: "Part II-B", sectionTitle: "感情を薄める副詞（kind of / sort of / a bit）",
    type: "rewrite",
    instruction: "感情を薄める表現に言い換えましょう",
    prompt: "I'm tired.",
    hint: "kind of / a bit を使って",
    modelAnswer: "I'm kind of tired.",
    altAnswers: ["I'm a bit tired.", "I'm sort of tired."],
    explanation: "kind of / a bit / sort of を加えるだけで「ちょっと疲れた」というトーンダウンに。直接的すぎず、相手への押しつけ感がなくなります。"
  },
  {
    id: 47, section: "Part II-B", sectionTitle: "感情を薄める副詞（kind of / sort of / a bit）",
    type: "choice",
    instruction: "「そのアイデア、ちょっと微妙かも」を最も自然に言うのはどれ？",
    choices: [
      "That idea is bad.",
      "That idea is kind of questionable.",
      "That idea is somewhat terrible."
    ],
    correct: 1,
    explanation: "kind of questionable が最も使いやすい表現。「ちょっと疑問が残るかな」というやわらかい否定です。terrible は強すぎ、bad は直接的すぎます。"
  },
  {
    id: 48, section: "Part II-B", sectionTitle: "感情を薄める副詞（kind of / sort of / a bit）",
    type: "compose",
    instruction: "感情を薄める副詞を使って英語にしましょう",
    prompt: "その映画、ちょっと長すぎたかな。",
    modelAnswer: "The movie was a bit long.",
    altAnswers: ["The movie was kind of long.", "It was somewhat long."],
    explanation: "a bit / kind of / somewhat で「ちょっと長かった」という印象に。「長すぎた！」という断定より相手の意見を尊重した言い方になります。"
  },
  {
    id: 49, section: "Part II-B", sectionTitle: "感情を薄める副詞（kind of / sort of / a bit）",
    type: "rewrite",
    instruction: "より柔らかく言い換えましょう",
    prompt: "That's weird.",
    hint: "a bit / kind of を使って",
    modelAnswer: "That's a bit weird.",
    altAnswers: ["That's kind of strange.", "That's somewhat unusual."],
    explanation: "a bit / kind of で「ちょっと変だね」に。断定的な批評ではなく、軽い観察として伝わります。"
  },
  {
    id: 50, section: "Part II-B", sectionTitle: "感情を薄める副詞（kind of / sort of / a bit）",
    type: "fill",
    instruction: "最も自然な副詞を選びなさい",
    prompt: "I'm ________ nervous about the presentation.",
    hint: "「ちょっと緊張してる」",
    choices: ["a bit", "very", "extremely"],
    correct: 0,
    explanation: "a bit nervous = 「ちょっと緊張してる」。very / extremely は感情が強く出すぎて、相手に心配をかける可能性があります。"
  },

  // ─── Part II-C: Soft No ───
  {
    id: 51, section: "Part II-C", sectionTitle: "間接的な否定（Soft No）",
    type: "rewrite",
    instruction: "直接的な断りをSoft Noに変えましょう",
    prompt: "I can't do that.",
    hint: "That might be tricky / difficult を使って",
    modelAnswer: "That might be a bit tricky.",
    altAnswers: ["That could be difficult.", "I'm not sure that would work."],
    explanation: "I can't（できない）→ That might be tricky（ちょっと難しいかも）で、断りではなく現実的な困難さを伝える表現に変わります。"
  },
  {
    id: 52, section: "Part II-C", sectionTitle: "間接的な否定（Soft No）",
    type: "choice",
    instruction: "ビジネスで最もプロフェッショナルなSoft Noはどれ？",
    context: "締め切りを明日に早めてほしいと言われたが、無理な状況",
    choices: [
      "No, that's impossible.",
      "I'm afraid that might be a bit tight.",
      "I don't want to do that."
    ],
    correct: 1,
    explanation: "I'm afraid that might be a bit tight. が最もプロらしい断り方。「ちょっとタイトかもしれません」と、不可能ではなく困難さとして伝えています。"
  },
  {
    id: 53, section: "Part II-C", sectionTitle: "間接的な否定（Soft No）",
    type: "compose",
    instruction: "Soft Noで自然に断る英語を作りましょう",
    prompt: "その提案、ちょっとうまくいかないかもしれません。（会議での発言）",
    modelAnswer: "I'm not sure that would work.",
    altAnswers: ["That might be a bit difficult to implement.", "I have some concerns about that approach."],
    explanation: "I'm not sure that would work. は「うまくいくかどうか自信がない」という慎重な表現。直接的な否定を避けながらも懸念を伝えられます。"
  },
  {
    id: 54, section: "Part II-C", sectionTitle: "間接的な否定（Soft No）",
    type: "rewrite",
    instruction: "Soft Noに言い換えましょう",
    prompt: "That's a bad idea.",
    hint: "I have some concerns / might be worth reconsidering",
    modelAnswer: "I have some concerns about that.",
    altAnswers: ["That might be worth reconsidering.", "I'm not sure that's the best approach."],
    explanation: "That's bad（悪い）→ I have some concerns（少し懸念がある）で、批判ではなく建設的な疑問として伝わります。"
  },
  {
    id: 55, section: "Part II-C", sectionTitle: "間接的な否定（Soft No）",
    type: "fill",
    instruction: "最も自然なSoft No表現を選びなさい",
    prompt: "I'm ________ that might be outside our budget.",
    hint: "「〜ではないかと心配で」",
    choices: ["afraid", "sure", "happy"],
    correct: 0,
    explanation: "I'm afraid that... = 「残念ながら〜ではないかと思います」。丁寧な懸念・遠慮の表現として非常によく使われます。"
  },

  // ─── Part II-D: モーダル副詞 ───
  {
    id: 56, section: "Part II-D", sectionTitle: "確信度を示すモーダル副詞",
    type: "choice",
    instruction: "確信度が最も低い表現はどれ？",
    choices: ["certainly", "probably", "possibly"],
    correct: 2,
    explanation: "確信度：certainly（ほぼ確実）> probably（たぶん）> possibly（ひょっとしたら）。possibly が最も低い確信度を示します。"
  },
  {
    id: 57, section: "Part II-D", sectionTitle: "確信度を示すモーダル副詞",
    type: "fill",
    instruction: "状況に合う副詞を選びなさい",
    prompt: "It will ________ rain tomorrow. （天気予報で80%の確率）",
    hint: "probably / possibly / certainly",
    choices: ["probably", "possibly", "certainly"],
    correct: 0,
    explanation: "probably = 「たぶん・おそらく」（60〜80%の確信）。probably rain tomorrow が最も自然。certainly は100%近い確信、possibly は低確率のときに使います。"
  },
  {
    id: 58, section: "Part II-D", sectionTitle: "確信度を示すモーダル副詞",
    type: "rewrite",
    instruction: "確信度を下げた表現に言い換えましょう",
    prompt: "He is guilty.",
    hint: "probably / possibly を使って",
    modelAnswer: "He's probably guilty.",
    altAnswers: ["He might possibly be guilty.", "He could possibly be guilty."],
    explanation: "断言（is guilty）→ probably / possibly guilty で「たぶん有罪だと思う」という推測表現に。証拠がない場面では重要な区別です。"
  },
  {
    id: 59, section: "Part II-D", sectionTitle: "確信度を示すモーダル副詞",
    type: "compose",
    instruction: "モーダル副詞を使って英語にしましょう",
    prompt: "おそらく彼女はもう知っていると思う。",
    modelAnswer: "She probably already knows.",
    altAnswers: ["She most likely knows already.", "I think she probably knows."],
    explanation: "probably が「おそらく」にぴったり。already と組み合わせることで「もう知っているはず」という自然な推測になります。"
  },
  {
    id: 60, section: "Part II-D", sectionTitle: "確信度を示すモーダル副詞",
    type: "choice",
    instruction: "「まさかそんなことはないと思うけど…」に最も近い表現は？",
    choices: [
      "That certainly isn't true.",
      "That possibly isn't true.",
      "That surely isn't the case."
    ],
    correct: 1,
    explanation: "possibly isn't が「ひょっとしてそうじゃないかもしれない」という低確率の否定。surely は「まさか」という驚きの強調にもなりますが、possibly の方が控えめです。"
  },

  // ─── Part II-E: 強調と弱化のペア ───
  {
    id: 61, section: "Part II-E", sectionTitle: "強調（do/did）と弱化（過去形・仮定法）のペア",
    type: "choice",
    instruction: "より強調された表現はどれ？",
    context: "相手が「あなたは来なかった」と言っている場面",
    choices: [
      "I came.",
      "I did come.",
      "I would have come."
    ],
    correct: 1,
    explanation: "I did come. の did が強調の助動詞。「ちゃんと来ましたよ！」という反論・強調の表現です。I came. は普通の事実。"
  },
  {
    id: 62, section: "Part II-E", sectionTitle: "強調（do/did）と弱化（過去形・仮定法）のペア",
    type: "rewrite",
    instruction: "do/did を使って強調表現に変えましょう",
    prompt: "I like your idea.",
    hint: "do を使って「本当に好き」",
    modelAnswer: "I do like your idea.",
    altAnswers: ["I really do like your idea."],
    explanation: "I do like で「本当に好きなんだよ」という強調に。相手が疑っているときや、気持ちを強く伝えたいときに有効です。"
  },
  {
    id: 63, section: "Part II-E", sectionTitle: "強調（do/did）と弱化（過去形・仮定法）のペア",
    type: "rewrite",
    instruction: "弱化（仮定法）を使ってやわらかく言い換えましょう",
    prompt: "I want to go.",
    hint: "would を使って",
    modelAnswer: "I would love to go.",
    altAnswers: ["I'd want to go if possible.", "I would go if I could."],
    explanation: "want → would love to で「行けたらすごく嬉しいんだけど」という願望＋距離感の表現に変わります。"
  },
  {
    id: 64, section: "Part II-E", sectionTitle: "強調（do/did）と弱化（過去形・仮定法）のペア",
    type: "compose",
    instruction: "do/did を使って強調した英語にしましょう",
    prompt: "（相手が疑っているので）ちゃんと読んだよ！",
    modelAnswer: "I did read it!",
    altAnswers: ["I did actually read it.", "I do read it every time."],
    explanation: "I did read it! で「読んだことは読んだ！」という強い主張に。did を加えるだけで強調になります。"
  },
  {
    id: 65, section: "Part II-E", sectionTitle: "強調（do/did）と弱化（過去形・仮定法）のペア",
    type: "fill",
    instruction: "適切な語を選んで強調表現を完成させなさい",
    prompt: "She ________ try her best.",
    hint: "「本当に頑張ったんだよ」という強調",
    choices: ["did", "was", "had"],
    correct: 0,
    explanation: "She did try her best. で「本当にベストを尽くしたんだよ」という強調に。did + 動詞の原形 が強調の基本形です。"
  },

  // ─── Part II-F: 共感・寄り添い表現 ───
  {
    id: 66, section: "Part II-F", sectionTitle: "共感・寄り添い表現（EQ英語）",
    type: "choice",
    instruction: "相手が「仕事でミスをした」と話している。最も共感的な返しはどれ？",
    choices: [
      "You should be more careful.",
      "I can see why that was stressful.",
      "Everyone makes mistakes."
    ],
    correct: 1,
    explanation: "I can see why that was stressful. が最も共感的。相手の感情を「理解できる」と伝える表現です。should は説教に聞こえ、everyone makes mistakes は軽く受け流した印象になります。"
  },
  {
    id: 67, section: "Part II-F", sectionTitle: "共感・寄り添い表現（EQ英語）",
    type: "rewrite",
    instruction: "共感表現に言い換えましょう",
    prompt: "That sounds hard.",
    hint: "That must be / I can imagine を使って",
    modelAnswer: "That must be really hard.",
    altAnswers: ["I can imagine how hard that must be.", "That sounds incredibly difficult."],
    explanation: "must be は「きっと〜に違いない」という推測。That must be really hard. で「それは本当に大変だったに違いない」と深く共感する表現になります。"
  },
  {
    id: 68, section: "Part II-F", sectionTitle: "共感・寄り添い表現（EQ英語）",
    type: "compose",
    instruction: "共感・寄り添い表現を使って英語にしましょう",
    prompt: "それは本当につらかったと思う。よく頑張ったね。",
    modelAnswer: "That must have been really tough. You did well to get through it.",
    altAnswers: ["I can see how difficult that was. Well done for handling it.", "That must have been so hard. I'm proud of you."],
    explanation: "must have been（きっと〜だったに違いない）で過去の経験への共感を表現。You did well to... で相手の努力を認める言い方です。"
  },
  {
    id: 69, section: "Part II-F", sectionTitle: "共感・寄り添い表現（EQ英語）",
    type: "fill",
    instruction: "最も共感的な表現を選びなさい",
    prompt: "I ________ how you feel.",
    hint: "「気持ちわかるよ」",
    choices: ["understand", "know", "see"],
    correct: 0,
    explanation: "I understand how you feel. が最も直接的で真摯な共感の表現。I see / I know も使えますが、understand が最も感情的な深さを伝えます。"
  },
  {
    id: 70, section: "Part II-F", sectionTitle: "共感・寄り添い表現（EQ英語）",
    type: "rewrite",
    instruction: "より深い共感表現に言い換えましょう",
    prompt: "I understand that this is difficult.",
    hint: "I can see why / That must be を使って",
    modelAnswer: "I can see why this feels so difficult.",
    altAnswers: ["That must be really challenging for you.", "I can imagine how tough this is."],
    explanation: "I can see why... で「なぜそう感じるのかわかる」という共感に。相手の感情を否定せず、理由ごと受け止める言い方です。"
  },
  {
    id: 71, section: "Part II-F", sectionTitle: "共感・寄り添い表現（EQ英語）",
    type: "choice",
    instruction: "友人が大事な試験に落ちたと話している。最も寄り添いのある返しは？",
    choices: [
      "You should study harder next time.",
      "That must be so disappointing. How are you feeling?",
      "Don't worry, it's just an exam."
    ],
    correct: 1,
    explanation: "That must be so disappointing. How are you feeling? が正解。感情を認めた上で、相手の気持ちを聞く姿勢が最も寄り添っています。should は説教、don't worry は相手の気持ちを軽視している印象になります。"
  },
];

const sectionColors = {
  "Section 1": { bg: "#e8f4f0", accent: "#2d7a5e", light: "#c8e6dc" },
  "Section 2": { bg: "#eef2f9", accent: "#3d5fa0", light: "#c8d5ee" },
  "Section 3": { bg: "#f9f0e8", accent: "#a06020", light: "#eed5b0" },
  "Section 4": { bg: "#f5e8f5", accent: "#7a3d8a", light: "#ddb8e8" },
  "Section 5": { bg: "#f0f5e8", accent: "#507a30", light: "#c8dcb0" },
  "Section 6": { bg: "#f9eaee", accent: "#8a2a3e", light: "#e8b0bc" },
  "第1部": { bg: "#eaf5f9", accent: "#1a6a80", light: "#acd8e4" },
  "第2部": { bg: "#f5f0ea", accent: "#804e1a", light: "#dfc8aa" },
  "第3部": { bg: "#eaf0ea", accent: "#3a703a", light: "#a8cca8" },
  "Part II-A": { bg: "#f0eafa", accent: "#5a3a8a", light: "#d0b8f0" },
  "Part II-B": { bg: "#faf0e8", accent: "#8a5a20", light: "#f0d0a0" },
  "Part II-C": { bg: "#eaf0fa", accent: "#2a4a8a", light: "#a8c0f0" },
  "Part II-D": { bg: "#f0faf0", accent: "#2a7a3a", light: "#a0d8a8" },
  "Part II-E": { bg: "#faf4e8", accent: "#7a5a10", light: "#e8d090" },
  "Part II-F": { bg: "#faeaf0", accent: "#8a2a5a", light: "#f0a8c8" },
};

const typeLabels = {
  rewrite: "言い換え",
  choice: "選択",
  fill: "穴埋め",
  compose: "英作文",
  explain: "説明",
};

const sectionSummary = [
  { key: "Section 1", label: "might / could", desc: "可能性・柔らかい提案", icon: "💬" },
  { key: "Section 2", label: "過去形の距離感", desc: "want→wanted など心理的距離", icon: "🕰️" },
  { key: "Section 3", label: "be going to / was going to", desc: "予定・未実現の意図", icon: "📅" },
  { key: "Section 4", label: "条件文", desc: "現実との距離感・仮定法", icon: "🔀" },
  { key: "Section 5", label: "総合英作文", desc: "距離感のある自然な英語", icon: "✍️" },
  { key: "Section 6", label: "穴埋め総復習", desc: "全範囲の仕上げ", icon: "📝" },
  { key: "第1部", label: "選択問題", desc: "距離感の理解チェック", icon: "✅" },
  { key: "第2部", label: "英作文", desc: "距離感を調整する", icon: "🖊️" },
  { key: "第3部", label: "思考トレーニング", desc: "柔らかい表現への変換", icon: "🧠" },
  { key: "Part II-A", label: "Hedging", desc: "言い切らない・断言を避ける技術", icon: "🎯" },
  { key: "Part II-B", label: "感情を薄める副詞", desc: "kind of / sort of / a bit", icon: "🌫️" },
  { key: "Part II-C", label: "Soft No", desc: "間接的な断り・否定", icon: "🤝" },
  { key: "Part II-D", label: "モーダル副詞", desc: "probably / possibly / certainly", icon: "📊" },
  { key: "Part II-E", label: "強調と弱化", desc: "do/did強調 vs 仮定法弱化", icon: "⚖️" },
  { key: "Part II-F", label: "共感・EQ英語", desc: "I can see why / That must be...", icon: "💛" },
];

function CoverScreen({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d1f0d 0%, #1a0d2e 45%, #0d1a2e 100%)",
      fontFamily: "'Georgia', serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-start", padding: "32px 20px 40px",
      overflowX: "hidden"
    }}>
      {/* Stars background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[...Array(28)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 4 === 0 ? "3px" : "2px",
            height: i % 4 === 0 ? "3px" : "2px",
            borderRadius: "50%",
            background: "white",
            opacity: 0.2 + (i % 5) * 0.1,
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
          }} />
        ))}
      </div>

      <div style={{
        maxWidth: "620px", width: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)"
      }}>
        {/* Badge */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{
            background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)",
            fontSize: "12px", letterSpacing: "2px", padding: "6px 18px",
            borderRadius: "20px", border: "1px solid rgba(255,255,255,0.2)",
            textTransform: "uppercase"
          }}>
            English Grammar
          </span>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <h1 style={{
            color: "white", fontSize: "clamp(28px, 6vw, 42px)",
            fontWeight: "800", margin: 0, lineHeight: 1.2,
            letterSpacing: "-0.5px"
          }}>
            心理的距離感の英語
          </h1>
          <div style={{
            color: "rgba(255,255,255,0.5)", fontSize: "13px",
            margin: "10px 0 0", letterSpacing: "1px"
          }}>
            Psychological Distance in English
          </div>
        </div>

        {/* Subtitle tagline */}
        <div style={{
          textAlign: "center", marginBottom: "36px"
        }}>
          <p style={{
            color: "rgba(255,255,255,0.7)", fontSize: "15px",
            lineHeight: "1.8", margin: 0, maxWidth: "420px",
            marginLeft: "auto", marginRight: "auto"
          }}>
            「断言」を「やわらかい表現」に変える技術 ——<br />
            <span style={{ color: "rgba(255,220,100,0.9)", fontStyle: "italic" }}>
              might / could / 過去形 / 仮定法
            </span>
            　を使いこなす
          </p>
        </div>

        {/* Key concepts */}
        <div style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "18px", padding: "20px 24px", marginBottom: "28px"
        }}>
          <p style={{
            color: "rgba(255,255,255,0.45)", fontSize: "11px",
            letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 14px"
          }}>
            攻略する文法テーマ
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              "might / could", "過去形の距離感", "was wondering",
              "was going to", "仮定法過去", "Hedging",
              "kind of / a bit", "Soft No", "probably / possibly",
              "do/did 強調", "I can see why", "That must be"
            ].map(tag => (
              <span key={tag} style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
                fontSize: "13px", padding: "5px 13px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.15)"
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Section list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
          {sectionSummary.map((s, i) => (
            <div key={s.key} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", padding: "12px 16px",
              display: "flex", alignItems: "center", gap: "12px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-16px)",
              transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.06}s`
            }}>
              <span style={{ fontSize: "20px", flexShrink: 0 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", fontWeight: "600" }}>
                  {s.label}
                </span>
                <span style={{
                  color: "rgba(255,255,255,0.45)", fontSize: "12px", marginLeft: "8px"
                }}>
                  {s.desc}
                </span>
              </div>
              <span style={{
                color: "rgba(255,255,255,0.3)", fontSize: "11px",
                background: "rgba(255,255,255,0.07)",
                padding: "2px 8px", borderRadius: "8px"
              }}>
                {s.key}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "12px", marginBottom: "28px", justifyContent: "center"
        }}>
          {[
            { num: "71", label: "問" },
            { num: "15", label: "セクション" },
            { num: "5", label: "問題タイプ" },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, textAlign: "center",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px", padding: "14px 8px"
            }}>
              <div style={{ color: "rgba(255,220,100,0.9)", fontSize: "24px", fontWeight: "800" }}>
                {s.num}
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "2px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button onClick={onStart} style={{
          width: "100%", padding: "18px",
          background: "linear-gradient(135deg, #2d7a5e, #3d5fa0)",
          color: "white", border: "none", borderRadius: "16px",
          fontSize: "17px", fontWeight: "700", cursor: "pointer",
          fontFamily: "inherit", letterSpacing: "0.5px",
          boxShadow: "0 8px 32px rgba(45,122,94,0.4)",
          transition: "transform 0.15s, box-shadow 0.15s"
        }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(45,122,94,0.5)"; }}
          onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 8px 32px rgba(45,122,94,0.4)"; }}
        >
          スタート →
        </button>
      </div>
    </div>
  );
}

export default function GrammarQuizApp() {
  const [showCover, setShowCover] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [filter, setFilter] = useState("all");
  const [showSummary, setShowSummary] = useState(false);
  const [input, setInput] = useState("");
  const [selectedChoice, setSelectedChoice] = useState(null);

  const sections = [...new Set(questions.map(q => q.section))];
  const filtered = filter === "all" ? questions : questions.filter(q => q.section === filter);
  const q = filtered[current];
  const colors = q ? sectionColors[q.section] : sectionColors["Section 1"];
  const isRevealed = q && revealed[q.id];
  const answered = q && answers[q.id] !== undefined;

  useEffect(() => {
    setCurrent(0);
    setInput("");
    setSelectedChoice(null);
  }, [filter]);

  useEffect(() => {
    setInput(answers[q?.id]?.text || "");
    setSelectedChoice(answers[q?.id]?.choice ?? null);
  }, [current, filter]);

  function handleReveal() {
    if (q.type === "choice" || q.type === "fill") {
      if (selectedChoice === null) return;
      const isCorrect = selectedChoice === q.correct;
      setAnswers(a => ({ ...a, [q.id]: { choice: selectedChoice, correct: isCorrect } }));
    } else {
      if (!input.trim()) return;
      setAnswers(a => ({ ...a, [q.id]: { text: input.trim() } }));
    }
    setRevealed(r => ({ ...r, [q.id]: true }));
  }

  function handleNext() {
    if (current < filtered.length - 1) {
      setCurrent(c => c + 1);
      setInput("");
      setSelectedChoice(null);
    } else {
      setShowSummary(true);
    }
  }

  function handlePrev() {
    if (current > 0) {
      setCurrent(c => c - 1);
    }
  }

  function handleRestart() {
    setAnswers({});
    setRevealed({});
    setCurrent(0);
    setInput("");
    setSelectedChoice(null);
    setShowSummary(false);
  }

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(a => a.correct === true).length;
  const choiceTotal = questions.filter(q => q.type === "choice" || q.type === "fill").length;

  if (showCover) {
    return <CoverScreen onStart={() => setShowCover(false)} />;
  }

  if (showSummary) {
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #1a2a1a 0%, #2a1a3a 50%, #1a2a3a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        fontFamily: "'Georgia', serif"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.95)", borderRadius: "24px", padding: "40px",
          maxWidth: "520px", width: "100%", textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ fontSize: "24px", color: "#1a2a1a", marginBottom: "8px", fontWeight: "700" }}>
            問題集を完了しました！
          </h2>
          <p style={{ color: "#666", marginBottom: "32px", fontSize: "15px" }}>
            全 {filtered.length} 問に取り組みました
          </p>

          <div style={{
            background: "#f5f5f5", borderRadius: "16px", padding: "24px", marginBottom: "32px"
          }}>
            <div style={{ fontSize: "40px", fontWeight: "800", color: "#2d7a5e", marginBottom: "4px" }}>
              {answeredCount} / {filtered.length}
            </div>
            <div style={{ color: "#888", fontSize: "14px", marginBottom: "16px" }}>回答済み問題数</div>
            {choiceTotal > 0 && (
              <>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#3d5fa0" }}>
                  {correctCount} / {choiceTotal}
                </div>
                <div style={{ color: "#888", fontSize: "14px" }}>選択・穴埋め 正解数</div>
              </>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={handleRestart} style={{
              background: "#2d7a5e", color: "white", border: "none", borderRadius: "12px",
              padding: "14px 28px", fontSize: "15px", cursor: "pointer", fontWeight: "600",
              fontFamily: "inherit"
            }}>
              もう一度やり直す
            </button>
            <button onClick={() => { setShowSummary(false); setFilter("all"); setCurrent(0); }} style={{
              background: "#f0f0f0", color: "#333", border: "none", borderRadius: "12px",
              padding: "14px 28px", fontSize: "15px", cursor: "pointer", fontWeight: "600",
              fontFamily: "inherit"
            }}>
              セクション選択へ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a2a1a 0%, #2a1a3a 50%, #1a2a3a 100%)",
      fontFamily: "'Georgia', serif",
      padding: "16px"
    }}>
      {/* Header */}
      <div style={{
        maxWidth: "680px", margin: "0 auto 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div>
          <h1 style={{
            color: "white", fontSize: "20px", fontWeight: "700", margin: 0,
            letterSpacing: "0.5px"
          }}>
            心理的距離感の英語
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: "2px 0 0" }}>
            might / could / 仮定法 / 過去形
          </p>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: "20px",
          padding: "8px 16px", color: "white", fontSize: "13px"
        }}>
          {current + 1} / {filtered.length}
        </div>
      </div>

      {/* Section Filter */}
      <div style={{
        maxWidth: "680px", margin: "0 auto 16px",
        display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px"
      }}>
        {["all", ...sections].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            background: filter === s ? "white" : "rgba(255,255,255,0.15)",
            color: filter === s ? "#1a2a1a" : "white",
            border: "none", borderRadius: "20px",
            padding: "6px 14px", fontSize: "12px", cursor: "pointer",
            whiteSpace: "nowrap", fontFamily: "inherit", fontWeight: filter === s ? "700" : "400",
            transition: "all 0.2s"
          }}>
            {s === "all" ? "すべて" : s}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{
        maxWidth: "680px", margin: "0 auto 20px",
        background: "rgba(255,255,255,0.15)", borderRadius: "4px", height: "4px"
      }}>
        <div style={{
          width: `${((current + 1) / filtered.length) * 100}%`,
          background: "white", height: "100%", borderRadius: "4px",
          transition: "width 0.3s ease"
        }} />
      </div>

      {/* Question Card */}
      <div style={{
        maxWidth: "680px", margin: "0 auto",
        background: "white", borderRadius: "20px",
        overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.3)"
      }}>
        {/* Section Badge */}
        <div style={{
          background: colors.bg, padding: "14px 24px",
          borderBottom: `3px solid ${colors.accent}`,
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div>
            <span style={{
              background: colors.accent, color: "white", fontSize: "11px",
              padding: "3px 10px", borderRadius: "10px", fontWeight: "600",
              marginRight: "8px"
            }}>
              {q.section}
            </span>
            <span style={{
              background: colors.light, color: colors.accent, fontSize: "11px",
              padding: "3px 10px", borderRadius: "10px", fontWeight: "600"
            }}>
              {typeLabels[q.type]}
            </span>
          </div>
          <span style={{ color: colors.accent, fontSize: "12px", fontWeight: "600" }}>
            Q{q.id}
          </span>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Section title */}
          <p style={{ color: "#888", fontSize: "13px", marginBottom: "8px" }}>
            {q.sectionTitle}
          </p>

          {/* Instruction */}
          <h3 style={{
            fontSize: "16px", color: "#1a1a1a", marginBottom: "20px",
            fontWeight: "600", lineHeight: "1.5"
          }}>
            {q.instruction}
          </h3>

          {/* Context if any */}
          {q.context && (
            <div style={{
              background: "#f8f8f8", borderRadius: "10px", padding: "12px 16px",
              marginBottom: "16px", color: "#333", fontSize: "14px", fontStyle: "italic",
              borderLeft: `3px solid ${colors.accent}`
            }}>
              {q.context}
            </div>
          )}

          {/* Prompt */}
          {q.prompt && (
            <div style={{
              background: colors.bg, borderRadius: "12px", padding: "16px",
              marginBottom: "20px", textAlign: "center"
            }}>
              <p style={{
                color: colors.accent, fontSize: "18px", fontWeight: "700",
                margin: 0, lineHeight: "1.6", whiteSpace: "pre-line"
              }}>
                {q.prompt}
              </p>
              {q.hint && (
                <p style={{ color: "#888", fontSize: "13px", margin: "8px 0 0", fontStyle: "italic" }}>
                  ヒント：{q.hint}
                </p>
              )}
            </div>
          )}

          {/* Input Area */}
          {(q.type === "choice" || q.type === "fill") ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {q.choices.map((ch, i) => {
                let bg = "#f5f5f5";
                let border = "2px solid #e0e0e0";
                let color = "#333";
                if (selectedChoice === i && !isRevealed) {
                  bg = colors.light; border = `2px solid ${colors.accent}`; color = colors.accent;
                }
                if (isRevealed) {
                  if (i === q.correct) {
                    bg = "#e8f5e8"; border = "2px solid #4caf50"; color = "#2e7d32";
                  } else if (selectedChoice === i && i !== q.correct) {
                    bg = "#fdecea"; border = "2px solid #e53935"; color = "#b71c1c";
                  }
                }
                return (
                  <button key={i} onClick={() => !isRevealed && setSelectedChoice(i)} style={{
                    background: bg, border, borderRadius: "12px",
                    padding: "14px 18px", textAlign: "left", cursor: isRevealed ? "default" : "pointer",
                    color, fontSize: "15px", fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: "10px",
                    transition: "all 0.15s"
                  }}>
                    <span style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      background: isRevealed && i === q.correct ? "#4caf50" : (isRevealed && selectedChoice === i ? "#e53935" : colors.accent),
                      color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: "700", flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {ch}
                    {isRevealed && i === q.correct && <span style={{ marginLeft: "auto" }}>✓</span>}
                    {isRevealed && selectedChoice === i && i !== q.correct && <span style={{ marginLeft: "auto" }}>✗</span>}
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={{ marginBottom: "20px" }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isRevealed}
                placeholder="ここに英語で答えを入力してください…"
                style={{
                  width: "100%", minHeight: "80px", padding: "14px",
                  border: `2px solid ${isRevealed ? colors.accent : "#e0e0e0"}`,
                  borderRadius: "12px", fontSize: "16px", fontFamily: "inherit",
                  outline: "none", resize: "vertical", boxSizing: "border-box",
                  background: isRevealed ? colors.bg : "white",
                  color: "#1a1a1a", lineHeight: "1.5"
                }}
              />
            </div>
          )}

          {/* Action Button */}
          {!isRevealed ? (
            <button onClick={handleReveal} style={{
              width: "100%", background: colors.accent, color: "white",
              border: "none", borderRadius: "12px", padding: "16px",
              fontSize: "15px", fontWeight: "700", cursor: "pointer",
              fontFamily: "inherit", transition: "opacity 0.2s",
              opacity: ((q.type === "choice" || q.type === "fill") ? selectedChoice !== null : input.trim()) ? 1 : 0.5
            }}>
              答え合わせ・解説を見る
            </button>
          ) : (
            <div>
              {/* Model Answer */}
              <div style={{
                background: "#e8f5e8", border: "2px solid #4caf50",
                borderRadius: "12px", padding: "16px", marginBottom: "12px"
              }}>
                <p style={{ color: "#2e7d32", fontWeight: "700", fontSize: "13px", margin: "0 0 6px" }}>
                  ✓ 模範解答
                </p>
                <p style={{ color: "#1a1a1a", fontSize: "16px", margin: "0", lineHeight: "1.6" }}>
                  {q.modelAnswer || (q.type === "choice" ? q.choices[q.correct] : q.choices?.[q.correct])}
                </p>
                {q.altAnswers && q.altAnswers.length > 0 && (
                  <p style={{ color: "#666", fontSize: "13px", margin: "8px 0 0", fontStyle: "italic" }}>
                    他にも： {q.altAnswers.join(" / ")}
                  </p>
                )}
              </div>

              {/* Explanation */}
              <div style={{
                background: "#fff8e1", border: "2px solid #ffc107",
                borderRadius: "12px", padding: "16px", marginBottom: "16px"
              }}>
                <p style={{ color: "#e65100", fontWeight: "700", fontSize: "13px", margin: "0 0 6px" }}>
                  💡 解説
                </p>
                <p style={{ color: "#3e2723", fontSize: "14px", margin: 0, lineHeight: "1.7" }}>
                  {q.explanation}
                </p>
              </div>

              <button onClick={handleNext} style={{
                width: "100%",
                background: current < filtered.length - 1
                  ? `linear-gradient(135deg, ${colors.accent}, #1a2a3a)`
                  : "linear-gradient(135deg, #2d7a5e, #1a3a2a)",
                color: "white", border: "none", borderRadius: "12px",
                padding: "16px", fontSize: "15px", fontWeight: "700",
                cursor: "pointer", fontFamily: "inherit"
              }}>
                {current < filtered.length - 1 ? "次の問題へ →" : "結果を見る 🎉"}
              </button>
            </div>
          )}

          {/* Prev button */}
          {current > 0 && !isRevealed && (
            <button onClick={handlePrev} style={{
              width: "100%", background: "transparent",
              color: "#888", border: "1px solid #e0e0e0", borderRadius: "12px",
              padding: "10px", fontSize: "14px", cursor: "pointer",
              fontFamily: "inherit", marginTop: "10px"
            }}>
              ← 前の問題
            </button>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{
        maxWidth: "680px", margin: "16px auto",
        display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "center"
      }}>
        {filtered.map((_, i) => (
          <div key={i} onClick={() => { setCurrent(i); setInput(""); setSelectedChoice(null); }}
            style={{
              width: "10px", height: "10px", borderRadius: "50%", cursor: "pointer",
              background: i === current ? "white"
                : revealed[filtered[i].id] ? "rgba(255,255,255,0.7)"
                : "rgba(255,255,255,0.25)",
              transition: "all 0.2s",
              transform: i === current ? "scale(1.3)" : "scale(1)"
            }}
          />
        ))}
      </div>
    </div>
  );
}
