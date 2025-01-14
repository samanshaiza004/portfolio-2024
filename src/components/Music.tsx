import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
/* import { Button } from "./ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react"; */
import { motion } from "framer-motion";

interface Track {
  id: string;
  title: string;
  description: string;
  type: "audio" | "video";
  url: string;
  thumbnail?: string;
  tags: string[];
}

const tracks: Track[] = [
  {
    id: "1",
    title: "binutils",
    description: "an electronic rnb experiment",
    type: "audio",
    url: "/music/binutils ( if ur down ).mp3",
    tags: ["composition", "rnb"],
  },
  {
    id: "3",
    title: "okuran unlocks turbo granny power sound re design ",
    description:
      "recording is super scuffed lol ignore my mouse. first time i've sound designed something like this so i had no idea what i was doing, but it was fun to make.",
    type: "video",
    url: "kG7mv9KuNhc",
    tags: ["sound design", "anime"],
  },
  {
    id: "4",
    title: "oath",
    description: "i honestly have no idea what this is, but i like it",
    type: "audio",
    url: "https://utfs.io/f/59HxlDoACmIkTrjIN3q6PvmCqTRVJUM9khx5ty3DbczKnOIp",
    tags: ["composition", "electronic"],
  },
];

const AudioPlayer = ({ track }: { track: Track }) => {
  /* const [isPlaying, setIsPlaying] = useState(false); 
  const [isMuted, setIsMuted] = useState(false);*/
  const audioRef = useState<HTMLAudioElement | null>(null);

  return (
    <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
      <div className="flex-1">
        <audio
          ref={(node) => {
            audioRef[1](node);
          }}
          src={track.url}
          /* onEnded={() => setIsPlaying(false)} */
          className="w-full"
          controls
        />
      </div>
    </div>
  );
};

const YouTubeEmbed = ({ videoId }: { videoId: string }) => (
  <div className="aspect-w-16 aspect-h-9">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full rounded-lg"
    />
  </div>
);

export default function Music() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const motionPreferences = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setShouldReduceMotion(motionPreferences.matches);
  }, []);

  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  const containerVariants = {
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
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const uniqueTags = Array.from(
    new Set(tracks.flatMap((track) => track.tags))
  ).sort();

  const filteredTracks = tracks.filter(
    (track) => !filter || track.tags.includes(filter)
  );

  if (!mounted) return null;

  return (
    <div className="relative">
      <Card className="w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold">Music & Sound Design</h1>
            <p className="text-lg text-muted-foreground">
              Explore my portfolio of original compositions and sound design
              work.
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6 h-screen">
          <motion.section className="space-y-4" variants={containerVariants}>
            <motion.div
              className="flex gap-2 flex-wrap"
              variants={itemVariants}
            >
              {uniqueTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filter === tag ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setFilter(filter === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>

            {/* Featured track */}
            {selectedTrack && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                layout
              >
                <Card className="p-6 space-y-4">
                  <h2 className="text-2xl font-semibold">
                    {selectedTrack.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedTrack.description}
                  </p>
                  {selectedTrack.type === "audio" ? (
                    <AudioPlayer track={selectedTrack} />
                  ) : (
                    <YouTubeEmbed videoId={selectedTrack.url} />
                  )}
                </Card>
              </motion.div>
            )}

            {/* Track grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {filteredTracks.map((track) => (
                <motion.div
                  key={track.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${
                      selectedTrack?.id === track.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedTrack(track)}
                  >
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {track.description}
                    </p>
                    <div className="mt-2 flex gap-2">
                      {track.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </CardContent>
      </Card>
    </div>
  );
}
