import { ThemeToggle, useTheme } from "@/hooks/ThemeContext";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "./ui/card";

function NavBox() {
  return (
    <Card className="col-start-3 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-fit md:h-full overflow-y-auto">
      <CardHeader className="p-2 md:p-4">navigation ~</CardHeader>
      <CardContent className="p-2 md:p-4 space-y-4">
        <div
          role="banner"
          aria-label="Main navigation"
          className="overflow-auto max-h-[300px] border-b z-50"
        >
          <nav role="navigation" className="">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className="hover:underline transition-colors hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none rounded-md px-1 py-1 flex"
              >
                <img
                  className="w-5 h-5 mr-2"
                  src="https://web.archive.org/web/20091027153512/http://www.geocities.com/leggzz66/mustangani1.gif"
                  alt="an epic horse neighing"
                />{" "}
                Home
              </Link>
              <Link
                to="/about"
                className="hover:underline transition-colors hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none rounded-md px-1 py-1 flex"
              >
                <img
                  className="w-5 h-5 mr-2"
                  src="https://web.archive.org/web/20090829082629/http://www.geocities.com/sergeantsafrit/Revolver.gif"
                  alt="revolver revolving"
                />{" "}
                About
              </Link>
              <Link
                to="/blog"
                className="flex hover:underline transition-colors hovwr:text-primary focus:ring-2 focus:ring-primary focus:outline-none rounded-md px-1 py-1"
              >
                <img
                  className="w-5 h-5 mr-2"
                  src="https://web.archive.org/web/20060508022530/http://www.geocities.com:80/waterose_art/book.gif"
                  alt="book opening"
                />
                Blog
              </Link>
              <Link
                to="/music"
                className="flex hover:underline transition-colors hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none rounded-md px-1 py-1"
              >
                <img
                  className="w-5 h-5 mr-2"
                  src="https://web.archive.org/web/20091027084545/http://geocities.com/pump_q/w_pasta.gif"
                  alt="pasta on fire"
                />
                Music
              </Link>
              <Link
                to="/contact"
                className="flex hover:underline transition-colors hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none rounded-md px-1 py-1"
              >
                <img
                  className="w-5 h-5 mr-2"
                  src="https://web.archive.org/web/20081120130831/http://cf.geocities.com/rikuriku28/Images/sonycat.gif"
                  alt="sony cat"
                />
                Contact
              </Link>
              <div className="mb-2">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
        <FavoriteTunes />
        <div className="space-y-6 border-t border-border/40 pt-6">
          <WeatherWidget />
          <TimeWidget />
          <MoodWidget />
        </div>
        <img
          src="https://i.imgur.com/lzHxP.gif"
          alt="smily turning into a robot!"
          className="absolute bottom-4 right-4 w-20 h-20"
        />
      </CardContent>
    </Card>
  );
}

const TimeWidget = () => (
  <div className="my-6">
    <iframe
      src="https://free.timeanddate.com/clock/i9pyu8e0/n5442/fn4/fs18/fc111/tct/pct/blt0/brt0/btc00b/pl4/pr4/th1"
      width="89"
      height="26"
      title="Current Time"
      className="border-none bg-transparent"
    />
  </div>
);

const MoodWidget = () => (
  <div className="my-6">
    <a
      href="https://www.imood.com/users/samanshaiza"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-fit"
    >
      <img
        src="https://moods.imood.com/display/uname-samanshaiza/trans-1/imood.gif"
        alt="The current mood of samanshaiza at www.imood.com"
        className="rounded-sm hover:opacity-90 transition-opacity"
      />
    </a>
  </div>
);

const WeatherWidget = () => {
  const containerRef = useRef(null);

  const { theme } = useTheme();

  useEffect(() => {
    // Create and inject the weather widget script
    const script = document.createElement("script");
    script.src = "https://weatherwidget.io/js/widget.min.js";
    script.async = true;
    script.id = "weatherwidget-io-js";

    // Only inject if not already present
    if (!document.getElementById("weatherwidget-io-js")) {
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById("weatherwidget-io-js");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="my-6">
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/en/33d15n96d82/frisco/?unit=us"
        data-font="Noto Sans"
        data-mode="Current"
        data-days="3"
        data-theme={theme === "dark" ? "dark" : "clear"}
      >
        Frisco, TX, USA
      </a>
    </div>
  );
};

type SoundCloudEmbedProps = {
  trackUrl: string;
  artistUrl: string;
  name: string;
  link: string;
  artistName: string;
};

const FavoriteTunes = () => {
  const tracks: SoundCloudEmbedProps[] = [
    {
      link: "https://soundcloud.com/syzymusic2/drizzledown",
      trackUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1784110962&color=%238c848c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",

      artistUrl: "https://soundcloud.com/syzymusic2",
      name: "drizzle.down (inspired by hayden kolb)",
      artistName: "Syzymusic2",
    },
    {
      link: "https://soundcloud.com/john-tay-2-199198505/beach-theme-or-smth-2024-s-smp",
      trackUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1953659947&color=%238c848c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
      artistUrl: "https://soundcloud.com/john-tay-2-199198505",
      name: "beach theme or smth (2024) [s-smp]",
      artistName: 'john "joy" tay ',
    },
    {
      link: "https://soundcloud.com/hakushi-hasegawa/boys-texture",
      trackUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1774623678&color=%238c848c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
      artistUrl: "https://soundcloud.com/hakushi-hasegawa",
      name: "Boy’s Texture",
      artistName: "長谷川白紙",
    },
  ];

  return (
    <div className="mt-6">
      <h2 className=" text-xl font-bold mb-4 font-georgia text-[#009900] flex items-center gap-2">
        <img
          src="https://web.archive.org/web/20091026193637/http://geocities.com/EdiMusic/vorlagen/note.gif"
          alt="soundcloud"
          className="h-5 w-5 inline-block"
        />{" "}
        my fav tunes rn
      </h2>
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <SoundCloudEmbed
            key={index}
            artistUrl={track.artistUrl}
            name={track.name}
            link={track.link}
            trackUrl={track.trackUrl}
            artistName={track.artistName}
          />
        ))}
      </div>
    </div>
  );
};

const SoundCloudEmbed: React.FC<SoundCloudEmbedProps> = ({
  trackUrl,
  artistUrl,
  name,
  link,
  artistName,
}: {
  trackUrl: string;
  artistUrl: string;
  name: string;
  link: string;
  artistName: string;
}) => {
  return (
    <div className="mb-4">
      <iframe
        title="SoundCloud Player"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="0"
        allow="autoplay"
        src={trackUrl}
        className="rounded-md"
      />
      <div className="text-xs text-muted-foreground mt-1 truncate">
        <a
          href={artistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {artistName}
        </a>
        {" · "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {name}
        </a>
      </div>
    </div>
  );
};

export default NavBox;
