import React from "react";
import TiltedCard from "../TiltedCard";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

const YakuzaLikeADragonReview: React.FC = () => {
  const motionPreferences = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const shouldReduceMotion = motionPreferences.matches;

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <motion.article
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 20,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: shouldReduceMotion ? 0 : 0.6,
              staggerChildren: 0.2,
            },
          },
        }}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-3xl font-bold mb-3">
            Yakuza: Like a Dragon
          </h1>
          <h2 className="text-2xl text-muted-foreground mb-8">
            Ryu Ga Gotoku Studio
          </h2>
          <div className="flex justify-center items-center">
            <TiltedCard
              rotateAmplitude={8}
              scaleOnHover={1.08}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              altText="Yakuza: Like a Dragon cover"
              captionText="Yakuza: Like a Dragon - Ryu Ga Gotoku Studio"
              imageSrc="https://assets.reedpopcdn.com/yakuza-like-a-dragon-review-a-bold-and-brave-new-direction-for-the-series-1604930956923.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/yakuza-like-a-dragon-review-a-bold-and-brave-new-direction-for-the-series-1604930956923.jpg"
            />
          </div>
        </header>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 mb-6 justify-center"
        >
          {["rpg", "turn-based", "story-rich", "open-world"].map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-thin select-none"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-2xl mb-4">Overview</h3>
          <p className="text-muted-foreground">
            A bold reinvention of the Yakuza series that trades beat-em-up action for turn-based RPG combat while maintaining the heart and soul of what makes the franchise special.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Story</h3>
            <p className="text-lg mb-4">
              Yakuza: Like a Dragon introduces a new protagonist, Ichiban Kasuga, a low-ranking yakuza member who, after taking the fall for a crime he didn't commit, emerges from prison after 18 years to find his clan has been destroyed and his former patriarch has betrayed him. The narrative is a compelling tale of friendship, redemption, and finding one's place in a world that has moved on without you.
            </p>
            <p className="text-lg">
              What makes this story special is Ichiban himself - an unabashedly optimistic and kind-hearted hero whose love for Dragon Quest shapes his worldview, literally seeing his battles as turn-based RPG encounters. His journey from rock bottom to building a found family of outcasts creates some of the most heartfelt moments in gaming.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Gameplay</h3>
            <p className="text-lg mb-4">
              The biggest departure from previous Yakuza games is the combat system. Gone are the real-time brawls, replaced with turn-based RPG battles complete with jobs (classes), special abilities, and party members. This radical shift could have alienated fans, but instead feels like a natural evolution thanks to tight execution and the game's self-awareness.
            </p>
            <p className="text-lg mb-4">
              The job system allows characters to take on roles like Bodyguard, Musician, or even Chef, each with unique abilities and weapons. The combat remains engaging throughout with creative enemy designs and over-the-top special moves that maintain the series' signature humor.
            </p>
            <p className="text-lg">
              Outside of combat, Yakuza's famous minigames return in full force. From managing a business to kart racing, vocational exams, and even a movie theater where you must stay awake during boring films - the variety is staggering and consistently entertaining.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">World & Exploration</h3>
            <p className="text-lg mb-4">
              Set primarily in Yokohama's Ijincho district, Like a Dragon features the largest map in the series' history. The district feels alive with distinct neighborhoods, from the upscale Isezaki Ijincho to the seedy red light district and the homeless encampment where Ichiban begins his journey.
            </p>
            <p className="text-lg">
              The world is dense with activities, substories (side quests), and secrets to discover. Many substories tackle serious social issues like homelessness, immigration, and gender identity with surprising nuance, while others deliver the absurdist humor the series is known for.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Characters & Writing</h3>
            <p className="text-lg mb-4">
              Like a Dragon's greatest strength is its characters. Ichiban's party members - including a homeless former nurse, a disgraced cop, an ex-yakuza bar owner, and others - are all fully realized characters with their own motivations and growth arcs. Their banter and developing friendships form the emotional core of the game.
            </p>
            <p className="text-lg">
              The localization deserves special praise for its natural dialogue and cultural authenticity. The game tackles mature themes with a deft balance of gravity and humor that few other games achieve.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Presentation</h3>
            <p className="text-lg mb-4">
              Visually, Like a Dragon impresses with its detailed environments and expressive character models. The transition to the Dragon Engine brings Yokohama to life with realistic lighting and weather effects. Character animations during cutscenes are particularly noteworthy, conveying subtle emotions through facial expressions and body language.
            </p>
            <p className="text-lg mb-4">
              The soundtrack blends traditional Yakuza rock themes with RPG-inspired orchestral pieces that perfectly complement the game's dual nature. Voice acting is stellar in both Japanese and English, with Kaiji Tang delivering a standout performance as English Ichiban.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Conclusion</h3>
            <p className="text-lg">
              Yakuza: Like a Dragon represents a bold reinvention that succeeds on nearly every level. By embracing change while maintaining the heart and soul of what makes Yakuza special - compelling characters, a mix of serious drama and absurdist humor, and a dense world full of activities - it delivers one of the most refreshing and memorable RPG experiences in recent years. The few flaws, like occasional difficulty spikes and some grinding, are minor compared to what the game gets right. With its 9.2/10 rating, Yakuza: Like a Dragon isn't just a great Yakuza game - it's one of the finest RPGs of its generation.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="text-3xl text-center my-8"
        >
          Rating: (9.2/10)
        </motion.div>
      </motion.article>
    </Card>
  );
};

export default YakuzaLikeADragonReview;