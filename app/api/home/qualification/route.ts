import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    text: `
    <div className="text-sm">
    <p>Teams that are interested in participating must submit their qualification material before the deadline. The qualification procedure is dependent on the division and league. Please contact the chairs and co-chairs of the event if you have any further questions.</p>

    <p><strong className='font-extrabold'>FIRA Sports, FIRA Challenge, and FIRA Air</strong></p>
    <p>Qualification consists of two parts: (1) A max. 5 min long video showing the performance of your robot, and (2) a research paper for FIRA World Summit (max. 12 pages in Springer LNCS format).</p>

    <p><strong className='font-extrabold'>Videos</strong></p>
    <p>Videos must be uploaded to a publicly accessible video sharing site such as Youtube or Vimeo. Post a link into the FIRA official registration website, available in <a href="https://firaworldcup.org" class="underline">https://firaworldcup.org</a>.</p>

    <p><strong className='font-extrabold'>Team description paper (TDP)</strong></p>
    <p>All teams from this year should submit a team description paper (TDP). The TDP is limited to 6 pages maximum and must be submitted in PDF format. This report fully describes the scientific aspects of your robot system and your research interests, includes a summary of previous relevant achievements in research and development as well as publications, and mentions prior performance in FIRA competitions.</p>
    
    <p>The TDP must follow the LNCS format which can be downloaded from: <a href="http://www.springer.com/computer/lncs?SGWID=0-164-6-793341-0" class="underline">Springer LNCS format</a>. Please pay special attention to the “Author guidelines” that you’ll be able to find there. Teams that do not follow the LNCS formatting and style guidelines will not be qualified.</p>

    <p><strong className='font-extrabold'>FIRA Youth</strong></p>
    <p>Teams that are represented by a FIRA Chapter must qualify and register via their FIRA Chapter. Teams that do not yet have a chapter may contact FIRA HQ directly for qualification. In this case, they should submit a two-page write-up in English describing their previous experience in robotics and their motivation for joining the FIRA competition.</p>
    </div>
    `,
  });
}
