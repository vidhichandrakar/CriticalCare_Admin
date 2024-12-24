export const tripmHtmlTagsToNormalFormat = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};
export const tripmHtmlTagsToNormalFormatinside = (htmlString) => {
 
  return htmlString ? <div dangerouslySetInnerHTML={{ __html: htmlString }} style={{marginLeft:"3%", marginTop:"2%"}}/> : ""

};
