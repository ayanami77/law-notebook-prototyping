import { Card, CardBody, CardHeader, Heading, Text } from "@yamada-ui/react"
import { DOMParser } from "xmldom";

const getLawTitleInfo = (xmlDoc: Document) => {
  const lawEl = xmlDoc.getElementsByTagName('Law')[0];
  const lawType = lawEl.getAttribute("LawType");
  const lawCategory = lawEl.getAttribute("Category");
  const lawEnforcementDate = lawEl.getAttribute("EnforcementDate");

  return {
    lawType,
    lawCategory,
    lawEnforcementDate,
  }
}

const getLaw = async () => {
  const r = await fetch("https://elaws.e-gov.go.jp/api/1/lawdata/405AC0000000088", { cache: "no-cache" });
  const xml = await r.text()
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'application/xml');

  return {
    lawTitleInfo: getLawTitleInfo(xmlDoc),
  }
}

export const LawSearch = async () => {
  const { lawTitleInfo } = await getLaw();

  console.log(lawTitleInfo)

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{lawTitleInfo.lawCategory}</Heading>
      </CardHeader>
      <CardBody>
        <Text>
          {lawTitleInfo.lawType} | 施行日: {lawTitleInfo.lawEnforcementDate}
        </Text>
      </CardBody>
    </Card>
  )
}