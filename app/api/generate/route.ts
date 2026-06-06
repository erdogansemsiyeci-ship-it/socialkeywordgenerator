import { NextRequest, NextResponse } from "next/server";

const PLATFORM_PROMPTS: Record<string, string> = {
  instagram: "Generate 30 trending Instagram hashtags for the topic. Mix popular (1M+ posts), medium (100K-500K), and niche (1K-50K) hashtags. Return only the hashtags, one per line, with the # symbol. Format as clean list.",
  tiktok: "Generate 30 viral TikTok hashtags and keywords for the topic. Include trending sounds-related tags, FYP tags, and niche community tags. Return only the hashtags/keywords, one per line, with the # symbol. Format as clean list.",
  youtube: "Generate 30 SEO-optimized YouTube keywords for the topic. Include long-tail keywords, search phrases people actually type, and related topic keywords. Return one keyword/phrase per line, no # symbol. Format as clean list.",
  "yt-tags": "Generate 40 YouTube video tags for the topic. Include broad tags, specific long-tail tags, and competitor-related tags. Return one tag per line, comma-separated format ready for YouTube. Format as clean list.",
  seo: "Generate 25 long-tail SEO keywords for the topic. Include question-based keywords, comparison keywords, and buyer-intent keywords. Return one keyword per line. Format as clean list.",
  "free-tool": "Generate 30 popular hashtags for the topic across all social platforms. Include trending and evergreen tags. Return one hashtag per line, with the # symbol. Format as clean list.",
};

const FALLBACK_KEYWORDS: Record<string, Record<string, string[]>> = {
  instagram: {
    en: [
      "#socialmedia #instagram #trending #viral #contentcreator",
      "#instagood #photooftheday #love #fashion #beautiful",
      "#follow #like #instadaily #picoftheday #happy",
      "#explorepage #explore #reels #instagramreels #trendingaudio",
      "#digitalcreator #contentstrategy #socialmediatips #growth #engagement",
      "#photography #art #nature #travel #lifestyle",
      "#motivation #fitness #health #wellness #selfcare",
      "#business #marketing #branding #entrepreneur #success",
      "#food #foodie #yummy #delicious #homemade",
      "#tech #technology #innovation #startup #future",
      "#music #artist #creative #design #inspiration",
      "#community #support #loveislove #positivity #goodvibes",
      "#weekendvibes #mood #aesthetic #minimal #style",
      "#throwback #memories #family #friends #fun",
      "#learn #education #knowledge #growthmindset #skills",
      "#instareels #reelsinstagram #trendingreels #viralreels #reelstrending",
      "#socialmediamarketing #digitalmarketing #onlinemarketing #marketingdigital #marketingtips",
      "#smallbusiness #shoplocal #supportsmallbusiness #handmade #etsy",
      "#fitnessmotivation #workout #gymlife #fitfam #bodybuilding",
      "#travelgram #wanderlust #adventure #exploremore #travelphotography",
      "#foodstagram #foodphotography #foodie #instafood #yummyfood",
      "#fashionista #fashionblogger #ootd #streetwear #styleinspo",
      "#beautyblogger #makeup #skincare #beautytips #glowup",
      "#home decor #interiordesign #homedesign #decor #homesweethome",
      "#petsofinstagram #dogsofinstagram #catsofinstagram #pets #animallovers",
      "#quotes #inspirationalquotes #motivationalquotes #lifequotes #successquotes",
      "#crypto #bitcoin #nft #web3 #blockchain",
      "#ai #artificialintelligence #machinelearning #chatgpt #aitools",
      "#2024trends #newyear #goals #resolutions #freshstart",
      "#explorepage #fyp #foryou #foryoupage #viralvideo",
    ],
  },
  tiktok: {
    en: [
      "#fyp #foryou #viral #trending #tiktok",
      "#foryoupage #viralvideo #trendingnow #explore #blowup",
      "#xyzbca #fyppppppppp #viraltiktok #trendalert #discover",
      "#tiktokviral #tiktoktrending #tiktokcommunity #creators #contentcreator",
      "#smallcreator #newcreator #growmyaccount #supportsmallcreators #under5k",
      "#duet #stitch #greenscreen #capcut #tiktoktips",
      "#learnontiktok #edutok #tiktokuniversity #knowledge #facts",
      "#lifehacks #tipsandtricks #diy #tutorial #howto",
      "#dance #dancer #choreography #dancechallenge #trendingdance",
      "#comedy #funny #humor #lol #memes",
      "#storytime #pov #acting #skit #relatable",
      "#fitness #workout #gym #health #wellness",
      "#cooking #recipe #food #foodie #easyrecipe",
      "#beauty #makeup #skincare #grwm #makeuptutorial",
      "#fashion #outfit #style #ootd #fashiontiktok",
      "#travel #adventure #bucketlist #traveltiktok #hidden gems",
      "#music #musician #originalsong #coversong #singing",
      "#art #artist #drawing #painting #creative",
      "#tech #technology #coding #programming #techtok",
      "#business #entrepreneur #smallbusiness #marketing #sidehustle",
      "#motivation #inspiration #mindset #success #quotes",
      "#selfcare #mentalhealth #wellness #mindfulness #selflove",
      "#booktok #bookrecommendations #reading #booklover #bookclub",
      "#gaming #gamer #twitch #esports #videogames",
      "#anime #manga #weeb #otaku #animerecommendations",
      "#pets #dogs #cats #cuteanimals #petsoftiktok",
      "#sports #football #basketball #soccer #athlete",
      "#crypto #bitcoin #nft #investing #finance",
      "#grwm #morningroutine #nightroutine #routine #productivity",
      "#unboxing #haul #amazonfinds #shopping #musthaves",
    ],
  },
};

function getFallbackKeywords(toolType: string, topic: string, locale: string): string[] {
  const platformData = FALLBACK_KEYWORDS[toolType] || {};
  const langData = platformData[locale] || platformData["en"] || [];
  
  if (langData.length === 0) {
    return [topic, `${topic} tips`, `best ${topic}`, `${topic} guide`, `learn ${topic}`];
  }

  const topicWords = topic.toLowerCase().split(/\s+/);
  const baseHashtags = langData.map((h: string) => h.split(" ").slice(0, 3).join(" "));
  
  const customized = baseHashtags.slice(0, 15).map((base: string) => {
    const tags = base.split(" ");
    if (tags.length > 0) {
      tags[0] = `#${topicWords[0] || topic.toLowerCase()}`;
    }
    return tags.join(" ");
  });

  return [...customized, ...baseHashtags.slice(0, 15)];
}

export async function POST(request: NextRequest) {
  try {
    const { topic, toolType, locale } = await request.json();

    if (!topic || !toolType) {
      return NextResponse.json({ error: "Missing topic or toolType" }, { status: 400 });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (openaiKey) {
      try {
        const prompt = PLATFORM_PROMPTS[toolType] || PLATFORM_PROMPTS["free-tool"];
        const lang = locale === "tr" ? "Turkish" : "English";
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a social media keyword and hashtag expert. ${prompt} Respond in ${lang}.`,
              },
              { role: "user", content: topic },
            ],
            max_tokens: 500,
            temperature: 0.8,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || "";
          const keywords = content
            .split("\n")
            .map((line: string) => line.replace(/^\d+[\.\)]\s*/, "").trim())
            .filter((line: string) => line.length > 0);
          
          if (keywords.length >= 5) {
            return NextResponse.json({ keywords });
          }
        }
      } catch (apiError) {
        console.error("OpenAI API error:", apiError);
      }
    }

    const keywords = getFallbackKeywords(toolType, topic, locale);
    return NextResponse.json({ keywords });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
