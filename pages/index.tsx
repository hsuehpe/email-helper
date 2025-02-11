import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [lang, setLang] = useState<VibeType>("English");
  const [generatedDescs, setGeneratedDescs] = useState<string>("");
  const [isDone, setIsDone] = useState(false);
  const defultDesc = "Shopping Cart";
  let promptObj = {
    English: "UK English",
    繁體中文: "Traditional Chinese",
    日本語: "Japanese",
  };
  let text = desc || defultDesc;
  const keyword = text.split("\n")[0];
  const options = text.split("\n").slice(1);
  // Generate a business email in UK English that is friendly, but still professional and appropriate for the workplace. The email topic is:
  const prompt = `Generate a business email in ${
    promptObj[lang]
  } that is friendly, but still professional and appropriate for the workplace. The email topic is:${keyword}${
    text.slice(-1) === "." ? "" : "."
  }. And user input is ${options}. And finally, you only need to generate a JSON and format is: {"title": "your response or user input", "content": "your response or user input", "buttonText": "your response or user input", "buttonUrl": buttonUrl, imageUrls: [url1, url2, ...],"category": "email category in English"} , and category should be one of the following: "Welcome", "Newsletters", "Promotional", "AbandonedCart", "Referral", "Others". The field value of the JSON should not have any special characters and transform the new line character to <br>`;

  const generateDesc = async (e: any) => {
    e.preventDefault();
    setGeneratedDescs("");
    setIsDone(false);
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedDescs((prev) => prev + chunkValue);
    }

    setIsDone(true);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (isDone === true) {
        await fetch("/api/writeEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            generatedDescs,
          }),
        });
      }
    })();
  }, [isDone, generatedDescs]);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Email Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-2 sm:mt-4">
        <h1 className="sm:text-3xl text-2xl max-w-1xl font-bold text-slate-900">
          試試用 AI 產生你的 Email ！
        </h1>
        {/* <p className="text-slate-500 mt-5">18,167 bios generated so far.</p> */}
        <div className="max-w-xl w-full">
          <div className="flex mt-4 items-center space-x-3 mb-3">
            <p className="text-left font-medium">
              1. 輸入關鍵字, 以及你想要的選項 (每行一個選項). 例如:
              <br /> 購物車未結帳 <br />
              圖片: https://picsum.photos/id/1/200/300,
              https://picsum.photos/id/2/200/300,
              https://picsum.photos/id/3/200/300
            </p>
          </div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-2"
            placeholder={"e.g. " + defultDesc}
          />
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium">2. 選擇語系.</p>
          </div>
          <div className="block">
            <DropDown vibe={lang} setVibe={(newLang) => setLang(newLang)} />
          </div>
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-3 hover:bg-black/80 w-full"
              onClick={(e) => generateDesc(e)}
            >
              Generate your email &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-3 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-4">
              {generatedDescs && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your generated email
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto  whitespace-pre-wrap">
                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border text-left"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedDescs);
                        toast("Email copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                    >
                      <p>{generatedDescs}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
    </div>
  );
};

export default Home;
