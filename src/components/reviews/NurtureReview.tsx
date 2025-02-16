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
          Released in April 2021, Nurture marked Porter Robinson’s long-awaited
          return to the forefront of electronic music, following up his seminal
          2014 debut Worlds. After years of personal and artistic
          struggles—including battles with depression and creative
          stagnation—Robinson emerged with an album that feels deeply
          introspective, emotionally raw, and stylistically distinct from his
          earlier work.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl mb-4">Overall Impression</h3>
        <p className="text-muted-foreground">
          Nurture is a striking departure from the maximalist, festival-ready
          sound of Worlds. Instead of leaning on heavily processed
          vocaloid-esque textures and soaring synths, Robinson infuses this
          record with a delicate balance of acoustic elements, glitchy
          electronic production, and a more organic, human touch. The album
          features his own vocals—often pitch-shifted and modulated—creating an
          intimate and vulnerable atmosphere. Songs like Look at the Sky and
          Something Comforting exemplify this balance, blending lush piano
          melodies, warm synth layers, and intricate percussive details. The
          production across the album is meticulous, filled with soft glitches,
          reversed samples, and an overall ethereal quality. Robinson’s ability
          to weave hyper-detailed electronic elements with more traditional
          singer-songwriter structures gives Nurture a unique sonic identity.
          While the album is cohesive in tone, it does tend to lean heavily into
          similar textures and motifs, occasionally bordering on repetitive.
        </p>
      </section>

      <div className="text-3xl text-center my-8">Rating: (9.5/10)</div>
    </div>
  );
};

export default NurtureReview;
