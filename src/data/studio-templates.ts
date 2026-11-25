export type StudioProduct = "Business card" | "Sticker" | "Poster";
export type StudioTemplate = { id:string; name:string; product:StudioProduct; collection:string; background:string; accent:string; motif:string; title:string; subtitle:string; font:string; orientation:"portrait"|"landscape"|"square" };

export const studioProducts:{name:StudioProduct; icon:string; description:string; dimensions:string[]}[] = [
  {name:"Business card",icon:"▣",description:"Professional cards for your people and ideas.",dimensions:["85 × 55 mm","90 × 50 mm","Custom"]},
  {name:"Sticker",icon:"✦",description:"Individual die-cuts or playful sticker sheets.",dimensions:["5 × 5 cm","7 × 7 cm","10 × 10 cm","Custom"]},
  {name:"Poster",icon:"✿",description:"Personalized wall art, prints, and expressive keepsakes.",dimensions:["A5","A4","A3","30 × 40 cm","Custom"]},
];

export const studioTemplates:StudioTemplate[]=[
  {id:"editorial-bloom",name:"Editorial Bloom",product:"Business card",collection:"Feminine Editorial",background:"#F6F0E6",accent:"#791B3D",motif:"✿",title:"YOUR STUDIO",subtitle:"thoughtful things, made beautifully",font:"Playfair Display",orientation:"landscape"},
  {id:"modern-maker",name:"Modern Maker",product:"Business card",collection:"Modern Startup",background:"#FFFCF8",accent:"#3A302C",motif:"✦",title:"YOUR BUSINESS",subtitle:"creative direction & strategy",font:"DM Sans",orientation:"landscape"},
  {id:"ribbon-note",name:"Ribbon Note",product:"Sticker",collection:"Decorative Stickers",background:"#F4DDE3",accent:"#791B3D",motif:"♡",title:"MADE WITH LOVE",subtitle:"a little note from me to you",font:"Playfair Display",orientation:"square"},
  {id:"butterfly-name",name:"Butterfly Name",product:"Sticker",collection:"Decorative Stickers",background:"#F6F0E6",accent:"#A9365D",motif:"🦋",title:"YOUR NAME",subtitle:"keep growing",font:"Caveat",orientation:"square"},
  {id:"butterfly-editorial",name:"Butterfly Editorial",product:"Poster",collection:"Butterfly Editorial",background:"#F4DDE3",accent:"#791B3D",motif:"🦋",title:"LOVE IN BLOOM",subtitle:"find beauty in every becoming",font:"Playfair Display",orientation:"portrait"},
  {id:"botanical-romance",name:"Botanical Romance",product:"Poster",collection:"Botanical Romance",background:"#F6F0E6",accent:"#791B3D",motif:"✿",title:"GROW WITH GRACE",subtitle:"the garden remembers every season",font:"Cormorant Garamond",orientation:"portrait"},
  {id:"heart-aesthetic",name:"Heart Aesthetic",product:"Poster",collection:"Heart Aesthetic",background:"#A9365D",accent:"#F5D267",motif:"♥",title:"MORE LOVE",subtitle:"for the walls that hold your story",font:"DM Sans",orientation:"portrait"},
  {id:"retro-words",name:"Retro Words",product:"Poster",collection:"Retro Typography",background:"#F5D267",accent:"#791B3D",motif:"✦",title:"MAKE A SCENE",subtitle:"your ideas deserve a little space",font:"DM Sans",orientation:"landscape"},
  {id:"arabic-poem",name:"Arabic Poem",product:"Poster",collection:"Personalized Prints",background:"#FFFCF8",accent:"#791B3D",motif:"❋",title:"كُن كما تُحب",subtitle:"a print for your favourite words",font:"Cairo",orientation:"portrait"},
];

export const decorationLibrary=["🦋","✿","❀","♡","♥","✦","⋆","🎀","❋","☾","☼","⌁"];
export const palette=["#791B3D","#A9365D","#C88B9D","#F4DDE3","#F6F0E6","#FFFCF8","#F5D267","#3A302C"];
