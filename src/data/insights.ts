/**
 * Real articles for the Insights section, written from the company's own
 * process (see data/company.ts and data/factory.ts) and general motion-
 * furniture manufacturing knowledge. Each is a full page at /insights/:id,
 * not a preview, so the copy here is the whole piece, not an excerpt draft.
 */
export type InsightSection = {
  heading: string
  body: string[]
  bullets?: string[]
}

export type InsightArticle = {
  id: string
  title: string
  excerpt: string
  metaDescription: string
  image: string
  readingTime: string
  publishedAt: string
  sections: InsightSection[]
}

export const insightArticles: InsightArticle[] = [
  {
    id: 'evaluating-oem-manufacturers',
    title: 'What to check before choosing an OEM furniture manufacturer',
    excerpt:
      'Capacity, quality process, and the questions worth asking before you commit a production line to a partner.',
    metaDescription:
      'A practical checklist for evaluating an OEM or ODM furniture manufacturing partner: capacity, quality control, sampling, MOQs and the questions to ask before you commit.',
    image: 'insights/evaluating-oem-manufacturers.webp',
    readingTime: '7 min read',
    publishedAt: '2026-02-04',
    sections: [
      {
        heading: 'Capacity is a claim until you can see it',
        body: [
          'Almost every manufacturer will tell you they can handle your volumes. The number worth asking for is not "what is your maximum capacity" but "what is your current committed capacity, and where does my order sit against it." A plant running near saturation on existing accounts will quietly push your dates back the first time something goes wrong upstream, foam delivery, a mechanism supplier, a fabric dye lot.',
          'Ask for a straight answer on monthly seats produced against monthly seats sold. A manufacturer with headroom will tell you without hesitating, because it is one of their selling points. One without headroom will talk about capacity in the abstract, "we can scale up," rather than in numbers.',
        ],
      },
      {
        heading: 'Where quality is actually checked',
        body: [
          'The honest answer to "how do you ensure quality" is rarely a single inspection at the end of the line. By the time a fully upholstered unit reaches final inspection, a structural or foam defect is expensive to fix and easy to miss under finished fabric. The more defensible model checks quality at each stage material is committed, not only once, at the end.',
          'When you visit or audit a plant, ask to see the inspection point for raw material (before it is cut), for the frame (before foam goes on), and for the finished unit (before it is packed). A manufacturer that can walk you through distinct checks at each of those points, with records tied to a batch or unit code, is telling you something concrete about how failures get caught early rather than shipped.',
        ],
        bullets: [
          'Raw material approval before it is bought, not after',
          'Inward inspection of every plywood, foam, fabric and mechanism batch',
          'In-process checks for dimensional accuracy and structural strength while the unit is built',
          'A final inspection with a unique identification code and a recorded inspection video before dispatch',
        ],
      },
      {
        heading: 'Sampling tells you more than a catalogue',
        body: [
          'A catalogue photo cannot tell you how a recline mechanism feels after 5,000 cycles, or whether a seam will hold under real fabric tension rather than a showroom drape. Before committing a production run, get a physical sample built to your actual specification, not the manufacturer\'s nearest standard model.',
          'A manufacturer confident in their own construction will produce a sample without treating it as a favour. If sampling is slow, vague on timeline, or comes back visibly different from what was discussed, that is a preview of how the full order will be handled, not an exception to it.',
        ],
      },
      {
        heading: 'Questions worth asking directly',
        body: [
          'Most of what determines whether a manufacturing relationship works is not visible in a product deck. These are the questions that tend to separate a real answer from a sales answer.',
        ],
        bullets: [
          'What is your current lead time from confirmed order to dispatch, not your best-case lead time?',
          'Can I see the plant, not just a showroom, before I commit volume?',
          'Who is my point of contact once the order is placed, and do they work on the floor or only in sales?',
          'What happens if a batch fails your own inspection, do I hear about it, or does it get reworked silently?',
          'Can you build to my drawings and specification, or only within your existing range?',
        ],
      },
      {
        heading: 'What this looks like at Little Nap Subhav',
        body: [
          'We manufacture recliners, motion sofas, cinema seating and sofa beds for brands that put their own name on the finished product, at a current capacity of 3,200 seats a month with a four-stage inspection process, material approval, inward inspection, in-process control and a final check with a recorded inspection video for every unit. Every model is built to order against your specification rather than pulled from a fixed catalogue.',
          'If you are in the middle of evaluating a manufacturing partner, we are glad to be one of the plants you compare against, including a visit to the floor in Dewas, not just the showroom.',
        ],
      },
    ],
  },
  {
    id: 'foam-density-explained',
    title: 'Foam density in motion furniture, explained',
    excerpt:
      'Why density and recovery matter more than thickness, and how it affects a chair after 10,000 recline cycles.',
    metaDescription:
      'A clear explanation of foam density in upholstered furniture: why density and indentation load deflection matter more than thickness, and how to specify foam that lasts.',
    image: 'insights/foam-density-explained.webp',
    readingTime: '6 min read',
    publishedAt: '2026-02-11',
    sections: [
      {
        heading: 'Density is not the same as firmness',
        body: [
          'The two numbers that actually describe a foam are density and Indentation Load Deflection (ILD), and they measure different things. Density is the weight of the foam per unit volume, usually given in kilograms per cubic metre, and it is mostly a proxy for how much material and how many polymer cells are packed into the cushion. ILD measures firmness, how much force it takes to compress the foam by a set percentage of its thickness.',
          'Two foams can have the same firmness on a showroom sit and very different densities. The lower-density one will feel similar on day one and noticeably different after a year of daily use, because density is the number that predicts how well the foam holds its shape under repeated load, not how it feels under a single press of the hand.',
        ],
      },
      {
        heading: 'Why thickness is the wrong question',
        body: [
          'A thicker cushion is often assumed to mean a better one, but thickness with low density just means more material collapsing at the same rate. What actually determines how a seat performs over years of use is the combination of density and the foam grade, standard, high-resilience (HR), or a specified blend, not how many centimetres it measures on day one.',
          'This is most visible in recline mechanisms and motion furniture generally, where the seat and back foam are cycled far more often than in a fixed sofa. A cushion built on low-density foam will show a visible seating impression, and a corresponding loss of support, well before the frame or mechanism shows any wear.',
        ],
      },
      {
        heading: 'What "10,000 cycles" actually tests',
        body: [
          'Motion furniture manufacturers commonly reference cycle testing, mechanically actuating a recline mechanism thousands of times to simulate years of daily use. The mechanism is only half of what that test reveals. The foam under load through the same cycles either recovers its shape each time or gradually compresses and loses recovery, which is a compression set failure, not a mechanism failure, even though it is often reported as "the chair feels worn out."',
          'When you are specifying or evaluating a motion furniture programme, ask what foam density and grade sits under the mechanism, not only what recline cycle rating the mechanism itself carries. A well-rated mechanism paired with under-specified foam will still disappoint a customer within the warranty period.',
        ],
      },
      {
        heading: 'Specifying foam that holds up',
        body: [
          'For seating that sees daily, repeated use, whether residential recliners or cinema and commercial seating, the practical specification points are density appropriate to the seating position (seat foam typically needs a higher density than back or arm foam, since it carries the load), a named foam grade rather than a generic description, and recovery testing rather than a single firmness reading.',
          'This is also where visiting or auditing a manufacturer\'s foam cutting and foaming stages is worth more than a spec sheet: foam that is profiled and bonded correctly to the frame geometry performs differently from the same foam grade fitted loosely or unevenly.',
        ],
        bullets: [
          'Match density to load, higher for seat cushions than for arms or headrests',
          'Ask for the foam grade by name, not just a firmness description',
          'Treat recline-cycle testing and foam recovery as two separate specifications, not one',
          'Where possible, sit in a sample after it has been cycle-tested, not only a fresh unit',
        ],
      },
      {
        heading: 'How this is handled at Little Nap Subhav',
        body: [
          'Foam is cut and profiled in-house to the seat, back and arm sections specified for each model, then bonded to the frame before upholstery goes on, so density and shape stay consistent across a production run rather than varying batch to batch. Dimensions, mechanism type, foam density and upholstery are confirmed against your specification for every programme, since this is OEM/ODM manufacturing, not a fixed catalogue.',
        ],
      },
    ],
  },
  {
    id: 'cinema-seating-buyers-guide',
    title: 'A buyer’s guide to cinema seating specifications',
    excerpt:
      'Row spacing, recline travel, accessories and duty cycle, what an auditorium fit-out actually needs to spec.',
    metaDescription:
      'A buyer\'s guide to cinema and auditorium seating specifications: row spacing, recline travel, motorised mechanisms, accessories and duty cycle for commercial fit-outs.',
    image: 'insights/cinema-seating-buyers-guide.webp',
    readingTime: '8 min read',
    publishedAt: '2026-02-18',
    sections: [
      {
        heading: 'Row spacing sets everything else',
        body: [
          'Row-to-row spacing (often called pitch) is the first number an auditorium fit-out has to fix, because it constrains recline travel, seat count and walking clearance all at once. Standard multiplex pitch tends to sit in a wide range depending on seating tier, from tighter economy rows through to wider premium and recliner rows that need more depth for a full recline.',
          'The trap in early planning is choosing seats before pitch is finalised, or the reverse. A recliner mechanism with a generous recline travel is wasted, or worse, blocks the row behind, if the pitch was set around a fixed-back seat. Pitch and mechanism travel have to be specified together, not sequentially.',
        ],
      },
      {
        heading: 'Recline travel and motorised mechanisms',
        body: [
          'Cinema recliners are almost always specified with a powered (motorised) recline rather than a manual handle, both for a premium feel and because a motor gives consistent, controllable travel across hundreds of seats rather than depending on how hard an individual guest pulls a lever. The mechanism needs a duty cycle rating suited to commercial use, meaningfully higher than a residential recliner, since a multiplex seat may be reclined and returned dozens of times a day across thousands of screenings a year.',
          'Specification should include the rated cycle count for the mechanism, the recline angle range, and how the seat returns to upright, since a mechanism that requires the guest to physically push back rather than motor-return adds friction to fast auditorium turnover between shows.',
        ],
      },
      {
        heading: 'Accessories are part of the specification, not an add-on',
        body: [
          'Cup holders, consoles, tray tables and USB or device charging points are usually treated as accessories late in the buying process, but they affect the base seat width and the row configuration from the start. A console between two seats, for instance, changes the effective seat centre-to-centre distance across the whole row.',
          'Fixing accessory requirements before finalising row width and seat count avoids a common rework: discovering after seats are ordered that consoles do not fit the planned aisle widths or accessibility clearances.',
        ],
        bullets: [
          'Cup holder and console placement, fixed or shared between adjacent seats',
          'Tray tables where food and beverage service is offered',
          'USB or wireless charging integrated into the armrest',
          'Row-end or companion seating for accessibility requirements',
        ],
      },
      {
        heading: 'Duty cycle and fabric are the other half of the spec',
        body: [
          'A residential recliner and a cinema recliner can look identical and be built to very different standards. Commercial seating needs a mechanism duty cycle rated for daily, high-frequency use across years of operation, and upholstery rated for commercial durability and, in most jurisdictions, fire-retardant certification appropriate to public assembly spaces.',
          'This is where a buyer should ask a manufacturer directly whether a model is rated for commercial or residential duty, rather than assuming a recliner range is interchangeable across both. The construction difference, mechanism grade, frame reinforcement, foam density under repeated cycling, is exactly the difference that shows up as premature wear once a seat is in daily multiplex use.',
        ],
      },
      {
        heading: 'What Little Nap Subhav builds for auditorium fit-outs',
        body: [
          'Our cinema seating range is specified for commercial duty cycles, multiplexes, private screening rooms and home theatres, with the row configurations, cup holders, consoles and accessories an auditorium fit-out needs built in rather than bolted on. Manufacturing capacity currently runs up to 1,000 cinema seating units a month alongside 500 recliner units, planned around committed volumes rather than quoted speculatively.',
          'If you are specifying seating for a new screen or a refurbishment, we can work from your row plan and pitch directly rather than fitting your project to a fixed catalogue model.',
        ],
      },
    ],
  },
]
