import { Box, Button, ButtonGroup, Divider, HStack, Heading, Text, VStack } from "@yamada-ui/react"
import { DOMParser } from "xmldom";

const extractLawTitleInfo = (xmlDoc: Document) => {
  const lawEl = xmlDoc.getElementsByTagName('LawTitle')[0];
  const lawTitle = lawEl.textContent;

  return {
    lawTitle: lawTitle ?? ""
  }
}

const extractPreamble = (xmlDoc: Document) => {
  const preambleEl = xmlDoc.getElementsByTagName('Preamble')[0];
  const paragraphs = preambleEl.getElementsByTagName('Paragraph');
  const sentences = Array.from(paragraphs ?? []).map((paragraph) => {
    const sentence = paragraph.getElementsByTagName('Sentence')[0].textContent;
    return {
      sentence: sentence ?? ""
    }
  });

  return sentences
}

const extractMainProvision = (xmlDoc: Document) => {
  const lawChapters = xmlDoc.getElementsByTagName('Chapter');
  const lawArticles = Array.from(lawChapters).map((chapter) => {
    const chapterTitle = chapter.getElementsByTagName('ChapterTitle')[0].textContent;
    const chapterArticles = chapter.getElementsByTagName('Article');
    const articles = Array.from(chapterArticles).map((article) => {
      const title = article.getElementsByTagName('ArticleTitle')[0].textContent;
      const sentences = Array.from(article.getElementsByTagName('Sentence')).map((sentenceEl) => sentenceEl.textContent);
      return {
        title: title ?? "",
        sentences: sentences ?? []
      }
    })

    return {
      chapterTitle: chapterTitle ?? "",
      articles: articles ?? []
    }
  })

  return lawArticles
}

const getLaw = async () => {
  const r = await fetch("https://elaws.e-gov.go.jp/api/1/lawdata/321CONSTITUTION", { cache: "no-cache" });
  const xml = await r.text()
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'application/xml');

  return {
    titleInfo: extractLawTitleInfo(xmlDoc),
    preamble: extractPreamble(xmlDoc),
    mainProvision: extractMainProvision(xmlDoc)
  }
}

const constructGuide = (titles: string[]) => {
  if (titles.length === 1) {
    return titles.at(0)
  }
  return `${titles.at(0)} ～ ${titles.at(-1)}`
}

export const Search = async () => {
  const { titleInfo, preamble, mainProvision } = await getLaw();

  return (
    <>
      <Heading size="lg">{titleInfo.lawTitle}</Heading>
      <Divider />
      <Box p="md">
        {preamble.map((sentence) => (
          <Text key={sentence.sentence} fontSize="sm" textIndent="1rem">{sentence.sentence}</Text>
        ))}
      </Box>
      <ButtonGroup mt="4" display="flex" direction="column" gap="8px">
        {mainProvision.map((chapter) => (
          <Button key={chapter.chapterTitle} variant="outline" colorScheme="gray" size="lg">
            <HStack w="full" justify="space-between" gap="xl">
              <Text fontSize="md">
                {chapter.chapterTitle}
              </Text>
              <Text fontSize="sm" fontWeight="normal">
                {constructGuide(chapter.articles.map((article) => article.title))}
              </Text>
            </HStack>
          </Button >
        ))}
      </ButtonGroup >
    </>
  )
}