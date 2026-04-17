import type { Locale } from "./i18n";

export type TVars = Record<string, string | number>;

// All UI-chrome strings. Lesson content lives with each day in LocalizedText form.
const DICT = {
  en: {
    // App shell
    appName: "CrackPy",
    appTagline: "14-day interview prep",
    runsInBrowser: "Runs in your browser",
    reset: "Reset",
    confirmReset: "Reset ALL progress, notes, and saved code? This cannot be undone.",

    // Sidebar
    daysComplete: "Days complete",
    fourteenDayPlan: "14-day plan",
    inProgress: "In progress",
    language: "Language",

    // Day intro
    dayOf: "Day {{n}} of 14",
    stepsCount: "{{n}} steps",
    finalTestAtEnd: "Final test at the end",
    whatYoullLearn: "What you'll learn today",
    byEndOfToday: "By end of today",
    yourProgress: "Your progress",
    stepsFrac: "{{done}}/{{total}} steps ({{pct}}%)",
    resumeDay: "Resume day {{n}}",
    startOver: "Start over",
    startLesson: "Start today's lesson",
    confirmRestart: "Restart Day {{n}} from the beginning? Your notes and code will stay.",
    activeLessonTip:
      "Tip — this is an active lesson. The teacher will ask you to type code, answer questions, and explain concepts in your own words. That struggle is what makes it stick. You can pause anytime and resume later — your progress is saved in your browser.",

    // Lesson flow
    dayOverview: "← Day {{n}} overview",
    notes: "Notes",
    continue: "Continue",
    continueWhenReady: "Continue when you're ready.",
    answerAboveToContinue: "Answer above to continue.",
    nicelyDoneContinue: "Nicely done — continue when ready.",
    lessonComplete: "Lesson complete. Take the final test to finish Day {{n}}.",
    startFinalTest: "Start final test",
    dayCompleteGreat: "Day {{n}} complete — great work!",
    pressEnter: "press Enter",

    // Steps — general
    run: "Run",
    running: "Running...",
    niceCorrect: "Nice —",
    notQuite: "Not quite —",
    submit: "Submit",

    // Exercise step
    yourTurnWriteCode: "Your turn — write code",
    solved: "Solved",
    hint: "Hint",
    hintLocked: "Try once first — hint unlocks after",
    hintShow: "Show hint",
    giveItAShot: "Give it a shot — it's okay to be wrong.",
    attempts: "Attempts: {{n}}",
    revealSolution: "Reveal solution",
    solutionShown: "Solution shown",
    confirmSolution: "Reveal solution? Try at least a few times first — struggle is where you learn.",
    solutionLocked: "Try at least twice before peeking at the solution",
    resetStarter: "Reset to starter code",

    // Demo / type-along step
    typeItOut: "Try it — type it out yourself",
    typeTargetBelow: "Type the code above into the box below. When it matches, you're done.",
    targetCode: "Target code",
    yourCode: "Your code",
    skipTyping: "Skip",
    matchesNice: "Matches — nicely typed!",
    keepTyping: "Keep going...",
    confirmSkip: "Skip typing? You'll learn more by typing it yourself.",

    // Quiz MC
    quickCheck: "Quick check",

    // Quiz text
    typeYourAnswer: "Type your answer",
    yourAnswerPlaceholder: "Your answer...",
    correctTag: "Correct —",
    expectedLike: 'Expected something like "{{answer}}" —',
    tryAgain: "Try again",

    // Recall
    recallExplain: "Recall — explain in your own words",
    recallPlaceholder: "Type your answer — no wrong answers here. This step builds memory.",
    revealGuideline: "Reveal guideline",
    oneWayToSayIt: "One way to say it:",

    // Checkpoint
    checkpointLabel: "Checkpoint",

    // Final test
    finalTestDay: "Final test — Day {{n}}",
    finalTestIntro: "Answer {{n}} questions. You need {{need}} correct to pass.",
    questionOf: "Question {{i}} of {{total}}",
    answerAboveShort: "— answer above to continue",
    next: "Next",
    seeMyScore: "See my score",
    passedLabel: "Passed",
    notYetTryAgain: "Not yet — try once more",
    dayCompleteLong:
      "Day complete. The concepts should feel natural now — if any felt shaky, review your notes tomorrow before starting the next day.",
    notPassedTip:
      "You need {{need}} correct to pass. Missing a few? That means there's something to review — the test is doing its job.",
    retakeTest: "Retake test",

    // Notes panel
    yourNotes: "Your notes",
    notesPlaceholder:
      "Jot down what clicked, what confused you, questions to revisit, code patterns to remember...",
    savedAutomatically: "Saved automatically as you type.",
    closeNotes: "Close notes",

    // Loading
    loadingPython: "Loading Python runtime...",
    pyodideSize: "Downloading Pyodide (~6MB). First load only.",
    failedLoadPython: "Failed to load Python",
    pythonConnError: "Failed to load Python runtime. Check your connection and refresh.",
  },

  zh: {
    appName: "CrackPy",
    appTagline: "14 天面试冲刺",
    runsInBrowser: "完全在浏览器运行",
    reset: "重置",
    confirmReset: "重置全部进度、笔记和保存的代码？此操作无法撤销。",

    daysComplete: "已完成天数",
    fourteenDayPlan: "14 天计划",
    inProgress: "进行中",
    language: "语言",

    dayOf: "第 {{n}} 天 · 共 14 天",
    stepsCount: "{{n}} 个环节",
    finalTestAtEnd: "末尾有期末测验",
    whatYoullLearn: "今天要学什么",
    byEndOfToday: "今天结束时",
    yourProgress: "你的进度",
    stepsFrac: "{{done}}/{{total}} 个环节 ({{pct}}%)",
    resumeDay: "继续第 {{n}} 天",
    startOver: "重新开始",
    startLesson: "开始今天的课程",
    confirmRestart: "从头重做第 {{n}} 天？你的笔记和代码会保留。",
    activeLessonTip:
      "提示：这是一节主动式课程。老师会让你动手敲代码、回答问题、用自己的话把概念讲一遍。这种「挣扎感」才能让你真正记住。你随时可以暂停再回来 —— 进度都存在浏览器里。",

    dayOverview: "← 第 {{n}} 天概览",
    notes: "笔记",
    continue: "继续",
    continueWhenReady: "准备好就点继续。",
    answerAboveToContinue: "先在上面完成，才能继续。",
    nicelyDoneContinue: "做得不错 —— 准备好就继续。",
    lessonComplete: "课程完成。做完期末测验，第 {{n}} 天就算过了。",
    startFinalTest: "开始期末测验",
    dayCompleteGreat: "第 {{n}} 天完成 —— 干得漂亮！",
    pressEnter: "按 Enter",

    run: "运行",
    running: "运行中...",
    niceCorrect: "答对 ——",
    notQuite: "不太对 ——",
    submit: "提交",

    yourTurnWriteCode: "换你写代码",
    solved: "已解决",
    hint: "提示",
    hintLocked: "先试一次 —— 之后提示会解锁",
    hintShow: "查看提示",
    giveItAShot: "先试一下 —— 写错也没关系。",
    attempts: "尝试次数：{{n}}",
    revealSolution: "查看答案",
    solutionShown: "答案已显示",
    confirmSolution: "真的要看答案吗？先至少试几次 —— 挣扎的时候才最长进。",
    solutionLocked: "至少尝试两次才能偷看答案",
    resetStarter: "恢复初始代码",

    typeItOut: "动手打一遍",
    typeTargetBelow: "把上面的代码照着敲到下面的框里。输入一致就算完成。",
    targetCode: "目标代码",
    yourCode: "你的代码",
    skipTyping: "跳过",
    matchesNice: "完全一致 —— 棒！",
    keepTyping: "继续打...",
    confirmSkip: "确定跳过？自己敲一遍学得更扎实。",

    quickCheck: "小测",

    typeYourAnswer: "输入你的答案",
    yourAnswerPlaceholder: "你的答案...",
    correctTag: "答对了 ——",
    expectedLike: "期望的答案类似「{{answer}}」——",
    tryAgain: "再试一次",

    recallExplain: "回忆 —— 用自己的话讲一遍",
    recallPlaceholder: "把想法敲出来 —— 这里没有标准答案。这一步是为了加深记忆。",
    revealGuideline: "查看参考答案",
    oneWayToSayIt: "可以这么讲：",

    checkpointLabel: "小结",

    finalTestDay: "期末测验 —— 第 {{n}} 天",
    finalTestIntro: "共 {{n}} 题。答对 {{need}} 题才能通过。",
    questionOf: "第 {{i}} 题 / 共 {{total}} 题",
    answerAboveShort: "—— 先在上方答完",
    next: "下一题",
    seeMyScore: "查看我的分数",
    passedLabel: "通过",
    notYetTryAgain: "还差一点 —— 再来一次",
    dayCompleteLong:
      "这一天完成啦。这些概念应该已经顺手了 —— 如果哪里还不稳，明天开始新内容前先翻一下笔记。",
    notPassedTip:
      "需要答对 {{need}} 题才能通过。错了几题？那正说明还有东西要复习 —— 测验本来就是干这个的。",
    retakeTest: "重新测验",

    yourNotes: "你的笔记",
    notesPlaceholder: "记下哪里豁然开朗、哪里卡住、要回头再看的问题、想记住的代码模式...",
    savedAutomatically: "边输入边自动保存。",
    closeNotes: "关闭笔记",

    loadingPython: "Python 运行环境加载中...",
    pyodideSize: "下载 Pyodide(约 6MB)。仅第一次加载。",
    failedLoadPython: "Python 加载失败",
    pythonConnError: "无法加载 Python 运行环境。请检查网络后刷新页面。",
  },
} as const;

export type StringKey = keyof (typeof DICT)["en"];

export function translate(locale: Locale, key: StringKey, vars?: TVars): string {
  const dict = DICT[locale] ?? DICT.en;
  let s = (dict as Record<string, string>)[key] ?? (DICT.en as Record<string, string>)[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`{{${k}}}`, "g"), String(v));
    }
  }
  return s;
}
