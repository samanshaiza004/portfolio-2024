import { ThemeToggle } from "@/hooks/ThemeContext";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "./ui/card";
import { HoverCardTrigger, HoverCard, HoverCardContent } from "./ui/hovercard";
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudFog,
  Sun,
  Wind,
} from "lucide-react";
// Weather API types
interface WeatherResponse {
  weather: Array<{
    id: number;
    main: string;
    description: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  name: string;
  cod: number;
}

interface DateTimeFormatOptions {
  weekday?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  hour12?: boolean;
}

const TimeIndicator: React.FC = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date): string => {
    const options: DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date: Date): string => {
    const options: DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <Card className="p-4 bg-background/60 backdrop-blur">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          {formatDate(dateTime)}
        </div>
        <div className="text-2xl font-mono">{formatTime(dateTime)}</div>
      </div>
    </Card>
  );
};

interface WeatherError {
  message: string;
  cod: number;
}

interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

const WeatherIndicator: React.FC = () => {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=33.1507&lon=-96.8236&appid=a1bb895d335e6a5b19bdcec9645d67b6&units=imperial`
        );

        if (!response.ok) {
          const errorData = (await response.json()) as WeatherError;
          throw new Error(errorData.message || "Failed to fetch weather data");
        }

        const data = (await response.json()) as WeatherResponse;
        setWeatherState({
          data,
          loading: false,
          error: null,
        });
      } catch (err) {
        setWeatherState({
          data: null,
          loading: false,
          error:
            err instanceof Error ? err.message : "Failed to fetch weather data",
        });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 1800000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (weatherCode: number): JSX.Element => {
    const iconProps = { className: "w-8 h-8" };

    switch (true) {
      case weatherCode >= 200 && weatherCode < 300:
        return <CloudLightning {...iconProps} />;
      case weatherCode >= 300 && weatherCode < 600:
        return <CloudRain {...iconProps} />;
      case weatherCode >= 600 && weatherCode < 700:
        return <CloudSnow {...iconProps} />;
      case weatherCode >= 700 && weatherCode < 800:
        return <CloudFog {...iconProps} />;
      case weatherCode === 800:
        return <Sun {...iconProps} />;
      case weatherCode >= 801 && weatherCode < 900:
        return <Cloud {...iconProps} />;
      default:
        return <Wind {...iconProps} />;
    }
  };

  if (weatherState.loading) {
    return (
      <Card className="p-4 bg-background/60 backdrop-blur">
        <div className="animate-pulse">Loading weather...</div>
      </Card>
    );
  }

  if (weatherState.error) {
    return (
      <Card className="p-4 bg-background/60 backdrop-blur">
        <div className="text-red-500">{weatherState.error}</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-background/60 backdrop-blur">
      {weatherState.data && (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Frisco, TX</div>
            <div className="text-2xl">
              {Math.round(weatherState.data.main.temp)}°F
            </div>
            <div className="text-sm text-muted-foreground">
              {weatherState.data.weather[0].description}
            </div>
          </div>
          <div className="text-primary">
            {getWeatherIcon(weatherState.data.weather[0].id)}
          </div>
        </div>
      )}
    </Card>
  );
};

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
          <WeatherIndicator />
          <TimeIndicator />
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
      <HoverCard>
        <HoverCardTrigger>
          <h2 className="text-xl font-bold mb-4 font-georgia text-[#009900] flex items-center gap-2 cursor-default select-none">
            <img
              src="https://web.archive.org/web/20091026193637/http://geocities.com/EdiMusic/vorlagen/note.gif"
              alt="soundcloud"
              className="h-5 w-5 inline-block"
            />{" "}
            my fav tunes rn
          </h2>
        </HoverCardTrigger>
        <HoverCardContent
          align="start" // This aligns the content with the left side of the trigger
          side="bottom"
          className="w-80 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 "
        >
          <p className="flex justify-between space-x-4">
            fun fact: you can listen while exploring the site. try it out!
          </p>
        </HoverCardContent>
      </HoverCard>
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
