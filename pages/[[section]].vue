<template>
  <div class="portfolio-page text-slate-800">
    <!-- Header -->
    <header
      class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur-md"
    >
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NuxtLink
          to="/"
          class="text-sm font-bold tracking-widest text-white sm:text-base"
          @click="onNavClick($event, '/')"
        >
          YH PORTFOLIO
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm transition-colors"
            :class="isActiveLink(link.to)
              ? 'text-cyan-accent'
              : 'text-slate-300 hover:text-cyan-accent'"
            @click="onNavClick($event, link.to)"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="rounded-full border border-white/30 px-5 py-2 text-sm text-white transition-colors hover:border-cyan-accent hover:text-cyan-accent"
            :class="{ 'border-cyan-accent text-cyan-accent': isActiveLink('/contact') }"
            @click="onNavClick($event, '/contact')"
          >
            문의하기
          </NuxtLink>
        </nav>

        <button
          class="text-white md:hidden"
          aria-label="메뉴 열기"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <i :class="mobileMenuOpen ? 'fa fa-times' : 'fa fa-bars'" class="text-xl" />
        </button>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="border-t border-white/10 bg-navy-950 px-4 py-4 md:hidden"
      >
        <nav class="flex flex-col gap-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="py-2 text-sm"
            :class="isActiveLink(link.to) ? 'text-cyan-accent' : 'text-slate-300'"
            @click="onNavClick($event, link.to)"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="mt-2 rounded-full border border-white/30 px-5 py-2 text-center text-sm text-white"
            @click="onNavClick($event, '/contact')"
          >
            문의하기
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative overflow-hidden bg-navy-950 pt-16 text-white">
      <div
        class="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-cyan-accent/10 blur-3xl"
      />
      <div
        class="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-glow/5 blur-3xl"
      />

      <div class="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <p class="hero-label">GENERATIVE AI &amp; DATA ENGINEER</p>
          <h1 class="hero-title">
            흩어진 문서와 데이터를<br />
            <span class="text-cyan-accent">답을 찾는 AI 서비스</span>로<br />
            만듭니다.
          </h1>
          <p class="hero-desc">
            복잡한 문서와 반복 업무를 분석하고, 검색·요약·응답이 가능한 AI/RAG 기반 서비스로
            설계합니다. 작은 PoC부터 실제 운영 가능한 웹 서비스까지 단계적으로 구현합니다.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/projects"
              class="rounded-full bg-cyan-accent px-6 py-3 text-sm font-semibold text-navy-950 transition-opacity hover:opacity-90"
              @click="onNavClick($event, '/projects')"
            >
              프로젝트 살펴보기
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-accent hover:text-cyan-accent"
              @click="onNavClick($event, '/contact')"
            >
              AI 서비스 상담하기
            </NuxtLink>
          </div>
          <div class="mt-10 flex flex-wrap gap-6 text-xs font-medium tracking-wider text-slate-500">
            <span v-for="tag in heroTags" :key="tag">{{ tag }}</span>
          </div>
        </div>

        <!-- RAG Pipeline Card -->
        <div class="rounded-2xl border border-white/10 bg-navy-800/80 p-6 shadow-2xl backdrop-blur-sm">
          <div class="mb-5 flex items-center justify-between">
            <span class="text-sm font-semibold text-white">RAG Pipeline</span>
            <span class="flex items-center gap-1.5 text-xs text-emerald-400">
              <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>
          </div>
          <div class="space-y-3">
            <div
              v-for="step in ragPipeline"
              :key="step.num"
              class="rounded-xl border border-white/5 bg-navy-900/60 p-4"
            >
              <div class="flex items-start gap-3">
                <span class="text-xs font-bold text-cyan-accent">{{ step.num }}</span>
                <div>
                  <p class="text-sm font-semibold text-white">{{ step.title }}</p>
                  <p class="mt-1 text-xs text-slate-400">{{ step.detail }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="bg-white py-20 lg:py-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p class="section-label">ABOUT</p>
            <h2 class="section-title">
              문제를 이해하고,<br />
              서비스로 구현하는 AI/RAG 개발자
            </h2>
            <p class="section-desc">
              프론트엔드 개발과 교육 경험을 바탕으로, 사용자의 업무 흐름을 이해하고 실제로
              사용할 수 있는 AI 기반 서비스를 설계합니다. 최근에는 RAG, 멀티모달 AI, TTS/STT,
              프롬프트 엔지니어링을 중심으로 문서 검색, AI 챗봇, 업무 자동화 서비스를
              연구하고 구현하고 있습니다.
            </p>
            
            <div class="about-visual">
              <img
                :src="portfolioImages.about"
                alt="AI/RAG 워크스페이스 일러스트"
                class="about-visual__image"
                loading="lazy"
                @error="onPortfolioImageError"
              />
            </div>            
          </div>
          <div class="card-grid about-card-grid">
              <div
                v-for="card in aboutCards"
                :key="card.title"
                class="about-card portfolio-card bg-slate-50 transition-shadow hover:shadow-md"
              >
                <p class="card-label">{{ card.label }}</p>
                <h3 class="card-title">{{ card.title }}</h3>
                <p class="card-desc">{{ card.description }}</p>
              </div>
            </div>
        </div>
      </div>
    </section>

    <!-- Core Expertise -->
    <section id="expertise" class="bg-slate-50 py-20 lg:py-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p class="section-label">CORE EXPERTISE</p>
            <h2 class="section-title">
              AI 기술보다<br />
              업무 문제를 먼저 봅니다.
            </h2>
            <p class="section-desc">
              단순히 AI 기능을 붙이는 것이 아니라, 사용자가 실제로 겪는 문서 검색, 반복 업무,
              고객 응대, 자료 정리 문제를 먼저 정의합니다. 이후 작은 PoC로 검증하고, 필요한
              기능만 단계적으로 확장하는 방식으로 서비스를 설계합니다.
            </p>
            <div class="expertise-visual">
              <img
                :src="portfolioImages.expertise"
                alt="AI 업무 문제 해결 프로세스 일러스트"
                class="expertise-visual__image"
                loading="lazy"
                @error="onPortfolioImageError"
              />
            </div>
          </div>
          <div class="expertise-cards">
            <div class="card-grid sm:grid-cols-2">
              <div
                v-for="item in expertiseItems"
                :key="item.title"
                class="expertise-card portfolio-card border border-slate-200 bg-white transition-shadow hover:shadow-md"
              >
                <div class="expertise-card__icon flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-accent/10">
                  <i :class="item.icon" class="text-cyan-glow" />
                </div>
                <h3 class="card-title">{{ item.title }}</h3>
                <ul class="expertise-card__list space-y-1.5">
                  <li
                    v-for="point in item.points"
                    :key="point"
                    class="flex items-start gap-2 text-xs text-slate-600"
                  >
                    <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-accent" />
                    {{ point }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Services -->
    <section id="services" class="bg-white py-20 lg:py-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="section-header section-header--center">
          <p class="section-label">AI SERVICES</p>
          <h2 class="section-title section-title--center">
            현장에 적용되는 AI 서비스를 만듭니다.
          </h2>
          <p class="section-desc section-desc--center">
            이런 AI/RAG 서비스를 함께 만들 수 있습니다. 무엇을 맡길 수 있는지 명확하게
            정리했습니다.
          </p>
        </div>

        <div class="card-grid md:grid-cols-3">
          <div
            v-for="(service, index) in primaryServices"
            :key="service.title"
            class="service-card portfolio-card flex flex-col"
            :class="{ 'service-card--active': index === 0 }"
          >
            <h3 class="card-title card-title--lg">
              {{ service.title }}
            </h3>
            <ul class="service-card__list flex-1 space-y-2">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="service-card__feature"
              >
                <span class="service-card__bullet" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <div class="card-grid card-grid--stack sm:grid-cols-2">
          <div
            v-for="service in extraServices"
            :key="service.title"
            class="service-card portfolio-card"
          >
            <h3 class="card-title">{{ service.title }}</h3>
            <p class="card-desc service-card__desc">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Projects -->
    <section id="projects" class="bg-slate-50 py-20 lg:py-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="section-header">
          <p class="section-label">SELECTED PROJECTS</p>
          <h2 class="section-title">
            문제를 해결한 프로젝트
          </h2>
        </div>

        <div class="mb-8 flex flex-wrap gap-2">
          <button
            v-for="filter in projectFilters"
            :key="filter.value"
            class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
            :class="activeFilter === filter.value
              ? 'bg-navy-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100'"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="card-grid sm:grid-cols-2">
          <component
            :is="project.link ? 'a' : 'article'"
            v-for="project in filteredProjects"
            :key="project.title"
            :href="project.link || undefined"
            :target="project.link ? '_blank' : undefined"
            :rel="project.link ? 'noopener noreferrer' : undefined"
            class="project-card overflow-hidden border border-slate-200 bg-white transition-shadow hover:shadow-lg"
            :class="{ 'project-card--linked': project.link }"
          >
            <div class="project-card__visual relative flex h-44 items-center justify-center">
              <i :class="project.icon" class="project-card__icon" />
            </div>
            <div class="project-card__body">
              <div class="project-card__tags flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                >
                  {{ tag }}
                </span>
              </div>
              <h3 class="card-title">{{ project.title }}</h3>
              <p class="card-desc">{{ project.description }}</p>
              <p class="project-card__tech text-xs text-slate-400">{{ project.tech }}</p>
              <span
                v-if="project.link"
                class="project-card__link text-sm font-medium text-cyan-glow hover:underline"
              >
                자세히 보기 →
              </span>
              <button
                v-else
                class="project-card__link text-sm font-medium text-cyan-glow hover:underline"
              >
                자세히 보기 →
              </button>
            </div>
          </component>
        </div>
      </div>
    </section>

    <!-- Working Process -->
    <section id="process" class="bg-navy-950 py-20 text-white lg:py-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="section-header section-header--center section-header--dark">
          <p class="section-label section-label--accent">WORKING PROCESS</p>
          <h2 class="section-title section-title--center section-title--dark">
            명확하게 진단하고, 작게 검증하며 확장합니다.
          </h2>
        </div>
        <div class="card-grid sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="step in processSteps"
            :key="step.num"
            class="process-card portfolio-card border border-white/10 bg-navy-800/50"
          >
            <span class="text-2xl font-bold text-cyan-accent">{{ step.num }}</span>
            <h3 class="card-title card-title--dark">{{ step.title }}</h3>
            <p class="card-desc card-desc--dark">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section id="contact" class="bg-navy-950 pb-20 pt-4 lg:pb-28">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-navy-800/60 p-8 sm:p-10 lg:flex-row lg:items-center"
        >
          <div class="max-w-xl">
            <p class="section-label section-label--accent">START A PROJECT</p>
            <h2 class="section-title section-title--cta">
              AI로 해결하고 싶은 업무가 있으신가요?
            </h2>
            <p class="section-desc section-desc--dark">
              문서 검색, 고객 문의 응대, 반복 업무 자동화처럼 막연한 아이디어도 괜찮습니다.
              현재 업무 흐름을 함께 정리하고, 작게 검증할 수 있는 AI/RAG 서비스 구조를
              제안드립니다.
            </p>
          </div>
          <a
            :href="`mailto:${contactInfo.email}`"
            class="shrink-0 rounded-full bg-cyan-accent px-8 py-4 text-sm font-semibold text-navy-950 transition-opacity hover:opacity-90"
          >
            프로젝트 문의하기
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/10 bg-navy-950 py-8 text-center text-sm text-slate-500">
      <p>© 2026 YH PORTFOLIO. All rights reserved.</p>
      <p class="mt-1 text-xs">Generative AI · RAG · Data Engineering Portfolio</p>
      <div class="footer-contact mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
        <a
          :href="`mailto:${contactInfo.email}`"
          class="transition-colors hover:text-cyan-accent"
        >
          {{ contactInfo.email }}
        </a>
        <a
          :href="`tel:${contactInfo.phone.replace(/-/g, '')}`"
          class="transition-colors hover:text-cyan-accent"
        >
          {{ contactInfo.phone }}
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { VALID_SECTIONS } from '~/composables/usePortfolioScroll'

definePageMeta({
  layout: 'portfolio',
  validate(route) {
    const section = route.params.section
    if (!section) return true
    const value = Array.isArray(section) ? section[0] : section
    return VALID_SECTIONS.includes(value)
  },
})

useHead({
  title: "YH PORTFOLIO | AI/RAG Developer",
  meta: [
    {
      name: 'description',
      content: '흩어진 문서와 데이터를 답을 찾는 AI 서비스로 만드는 AI/RAG 개발자 포트폴리오',
    },
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css',
    },
  ],
})

const { navigateToSection } = usePortfolioScroll()

const contactInfo = {
  email: 'labri70@gmail.com',
  phone: '010-2626-8422',
}

const portfolioImages = {
  about: '/images/photo1.png',
  expertise: '/images/photo2.png',
}

const onPortfolioImageError = (event) => {
  const img = event?.target
  if (img?.style) {
    img.style.display = 'none'
  }
}

const route = useRoute()
const mobileMenuOpen = ref(false)

const onNavClick = (event, path) => {
  event.preventDefault()
  mobileMenuOpen.value = false
  navigateToSection(path)
}
const activeFilter = ref('all')

const navLinks = [
  { label: '소개', to: '/about' },
  { label: '전문분야', to: '/expertise' },
  { label: '서비스', to: '/services' },
  { label: '프로젝트', to: '/projects' },
]

const isActiveLink = (path) => route.path === path

const heroTags = ['RAG', 'LLM Ops', 'Automation']

const ragPipeline = [
  { num: '01', title: 'Document Ingestion', detail: 'PDF · Web · Manual · FAQ' },
  { num: '02', title: 'Vector Search', detail: 'Embedding · Retrieval · Ranking' },
  { num: '03', title: 'AI Answer', detail: 'Summary · Response · Source' },
  { num: '04', title: 'Service UI', detail: 'Chatbot · Admin · Dashboard' },
]

const aboutCards = [
  {
    label: 'Frontend & Service UI',
    title: '웹 서비스 화면 설계',
    description: '웹 서비스 화면 설계와 사용자 흐름 구현 경험',
  },
  {
    label: 'AI/RAG Workflow',
    title: 'RAG 기반 챗봇 흐름',
    description: '문서 검색, 벡터DB, RAG 기반 챗봇 흐름 설계',
  },
  {
    label: 'Education & Consulting',
    title: '교육자 관점의 구조화',
    description: '복잡한 기술을 쉽게 구조화하고 설명하는 교육자 관점',
  },
]

const expertiseItems = [
  {
    icon: 'fa fa-search',
    title: 'RAG 구축/고도화',
    points: ['문서 수집·전처리 파이프라인', '벡터 검색 및 답변 품질 개선', '출처 표시 및 신뢰도 향상'],
  },
  {
    icon: 'fa fa-comments',
    title: 'AI 챗봇/에이전트',
    points: ['FAQ·고객 응대 챗봇 설계', 'Tool Calling 및 워크플로우 연동', 'Guardrails 및 응답 품질 관리'],
  },
  {
    icon: 'fa fa-cogs',
    title: '업무 자동화',
    points: ['문서 요약·분류 자동화', '보고서 초안 생성 워크플로우', '반복 업무 API 연동'],
  },
  {
    icon: 'fa fa-line-chart',
    title: 'LLM Ops & 서비스화',
    points: ['프롬프트 체인 설계', '관리자·대시보드 UI 구현', 'PoC → 운영 단계 확장 구조'],
  },
]

const primaryServices = [
  {
    title: '문서 기반 Q&A 시스템',
    features: [
      'PDF, 매뉴얼, 내부 문서 통합 검색',
      'RAG 기반 답변 및 출처 표시',
      '관리자 문서 업로드·관리 기능',
    ],
  },
  {
    title: '맞춤형 AI 챗봇',
    features: [
      'FAQ 및 서비스 정보 기반 응대',
      '고객 문의 흐름 설계',
      'Tool Calling 연동 구조',
    ],
  },
  {
    title: 'AI 업무 자동화',
    features: [
      '문서 요약·분류·보고서 초안 생성',
      '반복 업무 워크플로우 자동화',
      'API 연동 및 결과 검증 구조',
    ],
  },
]

const extraServices = [
  {
    title: '멀티모달 AI 실험',
    description: '이미지, 음성, 텍스트를 함께 활용하는 AI 서비스 흐름을 설계합니다.',
  },
  {
    title: 'TTS/STT 기반 서비스',
    description: '음성 입력, 음성 안내, 스크립트 변환 등 음성 기반 기능을 검토합니다.',
  },
]

const projectFilters = [
  { label: '전체', value: 'all' },
  { label: 'RAG', value: 'rag' },
  { label: 'AI 챗봇', value: 'chatbot' },
  { label: 'EDA', value: 'eda' },
  { label: '업무 자동화', value: 'automation' },
]

const projects = [
  {
    title: '건강 데이터 EDA 대시보드',
    category: 'eda',
    tags: ['EDA', 'Streamlit', 'Health Data'],
    description:
      '심장병과 당뇨 공개 데이터셋을 Streamlit으로 정리해 데이터 요약, 핵심 시각화, 모델 결과, 해석과 주의사항을 한 화면에서 확인할 수 있게 만든 분석 대시보드입니다.',
    tech: 'Python · Streamlit · Pandas · scikit-learn',
    icon: 'fa fa-heartbeat',
    link: 'https://health-eda-dashboard.streamlit.app/',
  },
  {
    title: '모델쇼케이스',
    category: 'eda',
    tags: ['MNIST', 'Streamlit', 'Model Demo'],
    description:
      'MNIST 숫자 분류 모델을 Streamlit 앱으로 구성해, 모델 예측 결과를 직접 확인할 수 있게 만든 모델 시연 프로젝트입니다.',
    tech: 'Python · Streamlit · Machine Learning',
    icon: 'fa fa-bicycle',
    link: 'https://mnist-bike-showcase.streamlit.app/',
  },
  {
    title: '교육 자료 통합 검색 어시스턴트',
    category: 'rag',
    tags: ['RAG', 'Education'],
    description: '강의자료, 문서, PDF를 통합 검색하고 핵심 내용을 요약하는 RAG 기반 교육 보조 서비스',
    tech: 'RAG · Vector Search · Firebase · Nuxt',
    icon: 'fa fa-graduation-cap',
  },
  {
    title: '고객 문의 응대 AI 챗봇',
    category: 'chatbot',
    tags: ['AI Chatbot', 'Customer Support'],
    description: '서비스 정보와 FAQ를 기반으로 고객 문의에 응답하는 챗봇 구조 설계',
    tech: 'LLM · Tool Calling · Guardrails',
    icon: 'fa fa-headphones',
  },
  {
    title: '문서 분석·보고서 자동화',
    category: 'automation',
    tags: ['Workflow', 'Automation'],
    description: '업로드한 문서를 요약하고 보고서 초안을 생성하는 업무 자동화 도구',
    tech: 'Document AI · Prompt Chain · API',
    icon: 'fa fa-file-text-o',
  },
  {
    title: '내부 지식 검색 AI 서비스',
    category: 'rag',
    tags: ['RAG', 'Knowledge Base'],
    description: '사내 문서와 매뉴얼을 검색 가능한 지식 기반으로 구성하는 RAG 서비스',
    tech: 'Embedding · Retrieval · Nuxt · Firebase',
    icon: 'fa fa-database',
  },
]

const processSteps = [
  {
    num: '01',
    title: '문제 정의',
    description: '서비스 목적, 사용자, 데이터, 반복 업무 흐름을 정리합니다.',
  },
  {
    num: '02',
    title: '데이터 진단',
    description: '문서 구조와 검색 가능성을 확인하고 RAG 적용 범위를 판단합니다.',
  },
  {
    num: '03',
    title: 'PoC 구현',
    description: '작은 기능부터 테스트 가능한 형태로 구현해 가능성을 검증합니다.',
  },
  {
    num: '04',
    title: '운영·개선',
    description: '피드백을 반영해 관리자 기능, 자동화, 확장 구조를 개선합니다.',
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter((p) => p.category === activeFilter.value)
})

</script>

<style scoped>
/*
  Typography — --fz-* 변수(px)만 수정
  Card Spacing — --card-* 변수(px)만 수정
*/
.portfolio-page {
  /* Hero */
  --fz-hero-label: 12px;
  --fz-hero-title: 48px;
  --fz-hero-desc: 16px;

  /* Section (라벨 · 주제목 · 부제목) */
  --fz-section-label: 14px;
  --fz-section-title: 34px;
  --fz-section-title-cta: 24px;
  --fz-section-desc: 16px;

  /* Card (카드 내 소제목) */
  --fz-card-label: 13px;
  --fz-card-title: 20px;
  --fz-card-title-lg: 18px;
  --fz-card-desc: 16px;

  /* Project Card */
  --fz-project-icon: 50px;

  /* Card Spacing — 카드 패딩·그리드 간격·내부 여백 */
  --card-padding: 30px;
  --card-gap: 20px;
  --card-inner-gap: 12px;
  --card-stack-gap: 20px;
  --card-radius: 16px;
}

/* ── Card Layout (여백) ── */
.card-grid {
  display: grid;
  gap: var(--card-gap);
}

.card-grid--stack {
  margin-top: var(--card-stack-gap);
}

.portfolio-card {
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

.project-card {
  border-radius: var(--card-radius);
}

.project-card--linked {
  display: block;
  color: inherit;
  text-decoration: none;
}

.project-card--linked:hover .project-card__link {
  text-decoration: underline;
}

.project-card__body {
  padding: var(--card-padding);
}

.project-card__tags {
  margin-bottom: 0.5rem;
}

.project-card__tech {
  margin-top: var(--card-inner-gap);
}

.project-card__link {
  display: inline-block;
  margin-top: var(--card-inner-gap);
}

.expertise-card__icon {
  margin-bottom: var(--card-inner-gap);
}

.expertise-card__list {
  margin-top: var(--card-inner-gap);
}

.service-card__list {
  margin-top: var(--card-stack-gap);
}

/* ── Hero ── */
.hero-label {
  margin-bottom: 1rem;
  font-size: var(--fz-hero-label);
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-cyan-accent);
}

.hero-title {
  font-size: var(--fz-hero-title);
  font-weight: 700;
  line-height: 1.25;
}

.hero-desc {
  margin-top: 1.5rem;
  max-width: 32rem;
  font-size: var(--fz-hero-desc);
  line-height: 1.625;
  color: rgb(148 163 184);
}

/* ── Section Header ── */
.section-header {
  margin-bottom: 2.5rem;
}

.section-header--center {
  margin-bottom: 3rem;
  text-align: center;
}

.section-header--dark .section-title--dark {
  color: #fff;
}

.section-label {
  font-size: var(--fz-section-label);
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-cyan-glow);
}

.section-label--accent {
  color: var(--color-cyan-accent);
}

.section-title {
  margin-top: 0.75rem;
  font-size: var(--fz-section-title);
  font-weight: 700;
  line-height: 1.375;
  color: var(--color-navy-950);
}

.section-title--center {
  text-align: center;
}

.section-title--cta {
  font-size: var(--fz-section-title-cta);
  color: #fff;
}

.section-desc {
  margin-top: 1.25rem;
  font-size: var(--fz-section-desc);
  line-height: 1.625;
  color: rgb(71 85 105);
}

.section-desc--center {
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  text-align: center;
}

.section-desc--dark {
  margin-top: 1rem;
  color: rgb(148 163 184);
}

/* ── Card Typography ── */
.card-label {
  font-size: var(--fz-card-label);
  font-weight: 600;
  color: var(--color-cyan-glow);
}

.card-title {
  font-size: var(--fz-card-title);
  font-weight: 700;
  color: var(--color-navy-950);
}

.card-label + .card-title {
  margin-top: 0.5rem;
}

.card-title--lg {
  margin-top: 0;
  font-size: var(--fz-card-title-lg);
}

.card-title--dark {
  margin-top: 0.75rem;
  color: #fff;
}

.card-desc {
  margin-top: 0.5rem;
  font-size: var(--fz-card-desc);
  line-height: 1.625;
  color: rgb(71 85 105);
}

.card-desc--dark {
  margin-top: 0.75rem;
  color: rgb(148 163 184);
}

/* ── About Cards ── */
.about-card-grid {
  margin-top: var(--card-stack-gap);
}

.about-visual {
  align-self: start;
}

@media (min-width: 1024px) {
  .about-visual {
    align-self: end;
  }
}

.about-visual__image,
.expertise-visual__image {
  width: 100%;
  height: auto;
  border-radius: var(--card-radius);
}

.expertise-visual {
  margin-top: var(--card-stack-gap);
}

.expertise-cards {
  align-self: start;
}

@media (min-width: 1024px) {
  .expertise-cards {
    align-self: end;
  }
}

.about-card {
  border: 1px solid #ccc;
}

/* ── AI Services Cards ── */
.service-card {
  border: 1px solid #ccc;
  background-color: rgb(248 250 252);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.service-card:hover,
.service-card--active {
  background-color: var(--color-navy-900);
  border-color: var(--color-navy-900);
}

.service-card:hover .card-title,
.service-card--active .card-title {
  color: #fff;
}

.service-card__feature {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 14px;
  color: rgb(71 85 105);
}

.service-card:hover .service-card__feature,
.service-card--active .service-card__feature {
  color: rgb(203 213 225);
}

.service-card__bullet {
  margin-top: 6px;
  height: 6px;
  width: 6px;
  flex-shrink: 0;
  border-radius: 9999px;
  background-color: var(--color-cyan-glow);
}

.service-card:hover .service-card__bullet,
.service-card--active .service-card__bullet {
  background-color: var(--color-cyan-accent);
}

.service-card:hover .service-card__desc,
.service-card--active .service-card__desc {
  color: rgb(203 213 225);
}

/* ── Project Cards ── */
.project-card__visual {
  background-color: #111f33;
}

.project-card__icon {
  font-size: var(--fz-project-icon);
  color: rgb(34 211 238 / 0.3);
}
</style>
