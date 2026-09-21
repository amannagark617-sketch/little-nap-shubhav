export type FaqItem = {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'Do you manufacture to your own catalogue only, or to our drawings?',
    answer:
      'Both. Most programmes start from one of our eight ranges as a construction baseline, then dimensions, mechanism, foam density and upholstery are specified against your brief. If you have your own drawings or an existing model you want built under your name, we work from those directly, this is OEM/ODM manufacturing, not a fixed catalogue.',
  },
  {
    question: 'Is there a minimum order quantity?',
    answer:
      'It depends on the model and the level of customisation, a near-standard range model has a different minimum to a fully custom development. Tell us the volume you are planning and we will confirm what is workable as part of the quote, rather than quoting a single number that does not fit every case.',
  },
  {
    question: 'What is your current production capacity?',
    answer:
      'We currently run at 3,200 seats a month across recliners, motion sofas, cinema seating and sofa beds, with capacity for up to 1,000 cinema seating units and 500 recliner units a month within that. We plan capacity around committed volumes, so ask directly if you need a large programme scheduled in.',
  },
  {
    question: 'Can we visit the plant before placing an order?',
    answer:
      'Yes. We host buyers and technical teams at the Dewas plant, and the on-site showroom is stocked across every range so you can sit in the models the same day. Arrange a visit in advance through the contact page so the right people are on site.',
  },
  {
    question: 'How is quality controlled during production?',
    answer:
      'Through four checks, not one at the end. Raw material is approved before it is bought, every inward batch of plywood, foam, fabric and mechanisms is inspected on arrival, dimensional accuracy and structural strength are checked while the unit is built, and a final inspection assigns a unique identification code with a recorded inspection video before dispatch.',
  },
  {
    question: 'What upholstery and material options do you offer?',
    answer:
      'Fabric and leatherette upholstery across the range, with foam density and grade specified by seating position and mechanism type, motorised or manual recline, motion sofa mechanisms, and sofa-bed conversions. Tell us your fabric and finish requirements and we confirm what is available for the range you are specifying.',
  },
  {
    question: 'Do you offer private label or white-label manufacturing?',
    answer:
      'Yes, this is the core of what we do. Units are built under your brand name, not ours, from a single private-label model through to a full catalogue developed with you.',
  },
  {
    question: 'Do you manufacture seating for cinemas and auditoriums?',
    answer:
      'Yes. Our cinema seating range is built for commercial duty cycles, multiplexes, private screening rooms and home theatres, specified with the row configuration, cup holders, consoles and accessories an auditorium fit-out needs rather than a residential recliner adapted after the fact.',
  },
  {
    question: 'How long does an order take from confirmation to dispatch?',
    answer:
      'It depends on the model, the volume and whether it is an existing range model or a new development that needs sampling first. We share an honest, specific production schedule as part of every quote rather than a generic estimate, so you know the real date before you commit.',
  },
  {
    question: 'Is this website an online store, can we buy directly here?',
    answer:
      'No. This site presents our manufacturing capability and product ranges, not a retail catalogue, every order is a B2B manufacturing programme quoted individually against your specification and volume. There is no price list because there is no fixed product to price.',
  },
  {
    question: 'How do we start a conversation with you?',
    answer:
      'Send an enquiry through the contact form with the models, volumes and timeline you have in mind, message us on WhatsApp, or call the plant directly. We read every enquiry and come back with clarifying questions before quoting.',
  },
]
