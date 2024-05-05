import { NewsApiEverythingRes } from '@/types/newsApi'
import Post from '@/components/custom/post/Post'

const articles: NewsApiEverythingRes[] = [
  {
    source: {
      id: null,
      name: 'ReadWrite',
    },
    author: 'Radek Zielinski',
    title: 'Short sellers face liquidations as Bitcoin breaks above $68,000',
    description:
      'Bitcoin (BTC) experienced a significant surge on April 4, gaining over $4,000 in a single day as traders anticipated potential… Continue reading Short sellers face liquidations as Bitcoin breaks above $68,000\nThe post Short sellers face liquidations as Bitcoi…',
    url: 'https://readwrite.com/short-sellers-face-liquidations-as-bitcoin-breaks-above-68000/',
    urlToImage:
      'https://readwrite.com/wp-content/uploads/2024/04/EaX0Ogd-SjKh6gLCXbG-5w.jpg',
    publishedAt: '2024-04-05T11:26:21Z',
    content:
      'Bitcoin (BTC) experienced a significant surge on April 4, gaining over $4,000 in a single day as traders anticipated potential short liquidations. The cryptocurrency’s price reached a high of over $6… [+3241 chars]',
  },
  {
    source: {
      id: 'wired',
      name: 'Wired',
    },
    author: 'Andy Greenberg',
    title:
      'A Vast New Dataset Could Supercharge the AI Hunt for Crypto Money Laundering',
    description:
      "Blockchain analysis firm Elliptic, MIT, and IBM, have released a new AI detection model—and the 200-million-transaction dataset it's trained on—that aims to spot the “shape” of Bitcoin money laundering.",
    url: 'https://www.wired.com/story/ai-crypto-tracing-model-money-laundering/',
    urlToImage:
      'https://media.wired.com/photos/6631a1936dc0c77846852ed5/191:100/w_1280,c_limit/Crypto-Money-Laundering-Security-GettyImages-1543076825.jpg',
    publishedAt: '2024-05-01T13:00:00Z',
    content:
      "As a test of their resulting AI tool, the researchers checked its outputs with one cryptocurrency exchangewhich the paper doesn't nameidentifying 52 suspicious chains of transactions that had all ult… [+3279 chars]",
  },
  {
    source: {
      id: null,
      name: 'ReadWrite',
    },
    author: 'Radek Zielinski',
    title: 'GBTC Bitcoin ETF holdings drop before halving',
    description:
      'The Grayscale Bitcoin Trust (GBTC), a prominent Bitcoin investment product, has seen a significant decline in its Bitcoin (BTC) holdings.… Continue reading GBTC Bitcoin ETF holdings drop before halving\nThe post GBTC Bitcoin ETF holdings drop before halving ap…',
    url: 'https://readwrite.com/gbtc-bitcoin-etf-holdings-drop-before-halving/',
    urlToImage:
      'https://readwrite.com/wp-content/uploads/2024/04/zxDgyfq8QYCzJhRAH2CF1g.jpg',
    publishedAt: '2024-04-17T16:43:29Z',
    content:
      'The Grayscale Bitcoin Trust (GBTC), a prominent Bitcoin investment product, has seen a significant decline in its Bitcoin (BTC) holdings. This is despite the outflows recently slowing down.\r\nAccordin… [+2125 chars]',
  },
  {
    source: {
      id: null,
      name: 'Slashdot.org',
    },
    author: 'EditorDavid',
    title:
      "Jack Dorsey's Block Is Investing 10% Of Its Bitcoin Profits Into Monthly Bitcoin Purchases",
    description:
      "An anonymous reader shared this report from the blog Bitcoinist:\n\nJack Dorsey's financial services and digital payments company, Block Inc., announced it will begin investing 10% of its monthly Bitcoin-related gross profits into BTC purchases. This announceme…",
    url: 'https://slashdot.org/story/24/05/04/0356205/jack-dorseys-block-is-investing-10-of-its-bitcoin-profits-into-monthly-bitcoin-purchases',
    urlToImage: 'https://a.fsdn.com/sd/topics/bitcoin_64.png',
    publishedAt: '2024-05-04T17:34:00Z',
    content:
      "Jack Dorsey's financial services and digital payments company, Block Inc., announced it will begin investing 10% of its monthly Bitcoin-related gross profits into BTC purchases. This announcement was… [+1022 chars]",
  },
  {
    source: {
      id: null,
      name: 'ReadWrite',
    },
    author: 'Radek Zielinski',
    title: 'BlackRock’s Bitcoin ETF sees first day without inflows',
    description:
      'BlackRock’s iShares Bitcoin Trust (IBIT) has experienced its first day without any inflows since the introduction of Bitcoin (BTC) exchange-traded… Continue reading BlackRock’s Bitcoin ETF sees first day without inflows\nThe post BlackRock’s Bitcoin ETF sees f…',
    url: 'https://readwrite.com/blackrocks-bitcoin-etf-sees-first-day-without-inflows/',
    urlToImage:
      'https://readwrite.com/wp-content/uploads/2024/04/eaa08a84-02bf-4e04-af55-67efc1e88950.webp',
    publishedAt: '2024-04-25T11:28:14Z',
    content:
      'BlackRock’s iShares Bitcoin Trust (IBIT) has experienced its first day without any inflows since the introduction of Bitcoin (BTC) exchange-traded funds (ETFs) in the United States in January, Farsid… [+1836 chars]',
  },
  {
    source: {
      id: null,
      name: 'ReadWrite',
    },
    author: 'Radek Zielinski',
    title: 'Early Bitcoin miner moves 50 BTC after years of inactivity',
    description:
      'An early Bitcoin (BTC) miner has moved a significant amount of Bitcoin after years of inactivity. Data shows that the… Continue reading Early Bitcoin miner moves 50 BTC after years of inactivity\nThe post Early Bitcoin miner moves 50 BTC after years of inactiv…',
    url: 'https://readwrite.com/early-bitcoin-miner-moves-millions/',
    urlToImage:
      'https://readwrite.com/wp-content/uploads/2024/04/vc4QVB5fT7OV8J7PLOzkmw.jpg',
    publishedAt: '2024-04-15T16:50:38Z',
    content:
      'An early Bitcoin (BTC) miner has moved a significant amount of Bitcoin after years of inactivity. Data shows that the miner transferred 50 BTC, worth over $3 million as of Monday, to two wallets duri… [+2540 chars]',
  },
]

const Posts = () => {
  return (
    <div className="flex gap-4 flex-wrap mt-16">
      {!!articles.length &&
        articles.map((article) => (
          <Post
            imageUrl={article.urlToImage}
            title={article.title}
            description={article.description}
            time={article.publishedAt}
            source={article.source.name}
          />
        ))}
    </div>
  )
}

export default Posts
