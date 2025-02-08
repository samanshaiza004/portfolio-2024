import React from "react";
import TiltedCard from "../TiltedCard";

interface TrackInfo {
  title: string;
  description: string;
  youtubeId?: string;
}

const NurtureReview: React.FC = () => {
  const standoutTracks: TrackInfo[] = [
    {
      title: "Look at the Sky",
      description: "An uplifting anthem about hope and perseverance",
      youtubeId: "TJBh_hj6DzE",
    },
    {
      title: "Something Comforting",
      description: "A perfect blend of electronic and organic elements",
      youtubeId: "cbd_h-BVD9o",
    },
    {
      title: "Mirror",
      description: "An introspective journey with powerful vocals",
      youtubeId: "PkiIPzG37vQ",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-8 md:p-4">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-3xl font-bold mb-3">Nurture</h1>
        <h2 className="text-2xl text-muted-foreground mb-8">Porter Robinson</h2>
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
            altText="Porter Robinson - Nurture"
            captionText="Porter Robinson - Nurture"
            imageSrc={
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fedm.com%2F.image%2Ft_share%2FMTgwNTE1MDU3Mzg0MzAxOTI4%2Fporterrobinson-nurture-album-cover-1-1611778054-scaled-1.jpg&f=1&nofb=1&ipt=119de33145c4023e2a072e4b892c2752e827d09b539b02a8dbae005875e61f87&ipo=images"
            }
          />
        </div>
      </header>

      <section className="mb-8">
        <h3 className="text-2xl mb-4">Introduction</h3>
        <p className="text-muted-foreground">
          Released in 2021, Nurture marks Porter Robinson's triumphant return
          after a seven-year hiatus. This album represents a dramatic shift from
          his previous work, incorporating more organic sounds, personal lyrics,
          and a rawer emotional core.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl mb-4">Standout Tracks</h3>
        {standoutTracks.map((track, index) => (
          <div
            key={index}
            className="bg-secondary/50 rounded-lg p-6 mb-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <h4 className="text-xl mb-2">{track.title}</h4>
            <p className="text-muted-foreground mb-4">{track.description}</p>
            {track.youtubeId && (
              <iframe
                className="w-full h-[315px] rounded-lg border-none my-4"
                src={`https://www.youtube.com/embed/${track.youtubeId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h3 className="text-2xl mb-4">Overall Impression</h3>
        <p className="text-muted-foreground">
          Nurture is a masterful blend of electronic production and organic
          instrumentation, creating a deeply personal and emotionally resonant
          experience. The album showcases Porter Robinson's growth as both a
          producer and songwriter, delivering messages of hope, self-discovery,
          and resilience through carefully crafted soundscapes.
        </p>
      </section>

      <div className="text-3xl text-center my-8">Rating: (9.5/10)</div>
    </div>
  );
};

export default NurtureReview;
