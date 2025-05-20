"use client"

import { Header } from "@/components/Header"
import { AppLayout } from "@/components/layout/AppLayout"
import { Footer } from "@/components/Footer"
import { motion } from "framer-motion"
import { Code, Share2, Users } from "lucide-react"
import { useRouter } from "next/navigation"

import AnimatedBackground from "@/components/AnimatedBackground"
import styles from "./HelpPage.module.css"

const steps = [
  {
    id: 1,
    title: "Create a Room",
    description: 'Click on the "Create Room" button from the homepage to start a new collaborative coding session.',
    icon: <Code className="w-7 h-7 text-indigo-300" />,
    cta: "Explore now",
  },
  {
    id: 2,
    title: "Invite Collaborators",
    description: "Copy the room URL and share it with friends or colleagues to join you in real-time.",
    icon: <Share2 className="w-7 h-7 text-indigo-300" />,
    cta: "Explore now",
  },
  {
    id: 3,
    title: "Collaborate Live",
    description: "Write, edit, and review code together in real-time with full synchronization.",
    icon: <Users className="w-7 h-7 text-indigo-300" />,
    cta: "Explore now",
  },
]

function StepCard({ step, onCtaClick }: { step: (typeof steps)[0]; onCtaClick: () => void }) {
  return (
    <div className={styles.card}>
      <div className={styles.stepTitleRow}>
        <div className={styles.stepCircle}>{step.icon}</div>
        <div className={styles.stepCardContent}>
          <span className={styles.stepTitle}>{step.title}</span>
        </div>
      </div>
      <div className={styles.stepDesc}>{step.description}</div>
      <button className={styles.ctaBtn} onClick={onCtaClick}>
        {step.cta}
      </button>
    </div>
  )
}

export default function HelpPage() {
  const router = useRouter()

  const handleNavigateToHome = () => {
    router.push("/")
  }

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen">
        <Header userCount={0} />
        <AnimatedBackground title="Help" subtitle="-Your guide to using LiveCodeShare" />
        <main className="pb-16">
          <div className="container mx-auto px-4 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className={styles.heading}>How to Use LiveCodeShare</h1>
              <p className={styles.subtitle}>
                Master collaborative coding with our simple step-by-step guide to using LiveCodeShare.
              </p>
            </motion.div>

            <div className="flex flex-col gap-16">
              {steps.map((step, index) => {
                const isEven = index % 2 === 0
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className={styles.stepRow}
                  >
                    {isEven ? (
                      <>
                        <StepCard step={step} onCtaClick={handleNavigateToHome} />
                        <div className={styles.stepNumberBox}>
                          <span className={styles.stepNumber}>{step.id}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.stepNumberBox}>
                          <span className={styles.stepNumber}>{step.id}</span>
                        </div>
                        <StepCard step={step} onCtaClick={handleNavigateToHome} />
                      </>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AppLayout>
  )
}
