/**
 * The plant, as documented on the two Factory Overview slides.
 *
 * `stage` groups the twelve areas into the order material actually moves
 * through the building, which is what the Manufacturing page walks through.
 */

export type ProcessStep = {
  id: string
  name: string
  image: string
  stage: 'Preparation' | 'Structure' | 'Comfort' | 'Finishing' | 'Despatch'
  body: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'npd-lab',
    name: 'N.P.D. Lab',
    image: 'npd-lab.webp',
    stage: 'Preparation',
    body: 'New product development. Prototypes are modelled, sat in and revised here before a model is released to the line — this is where ODM briefs become buildable drawings.',
  },
  {
    id: 'cnc-panel-saw',
    name: 'CNC & Panel Saw',
    image: 'cnc-panel-saw.webp',
    stage: 'Preparation',
    body: 'Ply and board are cut to drawing on CNC and panel saw. Machine cutting is what keeps frame components repeatable from the first unit of a run to the last.',
  },
  {
    id: 'foam-cutting',
    name: 'Foam Cutting',
    image: 'foam-cutting.webp',
    stage: 'Preparation',
    body: 'Foam blocks are profiled to the seat, back and arm sections specified for each model, so density and shape stay consistent across the batch.',
  },
  {
    id: 'fabric-cutting',
    name: 'Fabric Cutting',
    image: 'fabric-cutting.webp',
    stage: 'Preparation',
    body: 'Fabric and leatherette are laid up and cut to pattern, with nesting planned to control wastage on long production runs.',
  },
  {
    id: 'carpentry-assembly',
    name: 'Carpentry & Structure Assembly',
    image: 'carpentry-assembly.webp',
    stage: 'Structure',
    body: 'Cut components become the load-bearing frame. Joints, corner blocks and reinforcement are built in at this stage — everything the chair’s service life depends on.',
  },
  {
    id: 'foaming',
    name: 'Foaming',
    image: 'foaming.webp',
    stage: 'Comfort',
    body: 'Profiled foam is bonded to the frame to build the seat and back geometry, establishing the sit before any upholstery goes near the unit.',
  },
  {
    id: 'pillow-filling',
    name: 'Pillow Filling',
    image: 'pillow-filling.webp',
    stage: 'Comfort',
    body: 'Arm bolsters, headrest pads and scatter cushions are filled to weight, so the soft parts of the chair are as controlled as the structural ones.',
  },
  {
    id: 'sewing',
    name: 'Sewing',
    image: 'sewing.webp',
    stage: 'Finishing',
    body: 'Cut panels are stitched into covers. Seam placement, stitch density and piping are set here, and they are the details a buyer notices first.',
  },
  {
    id: 'upholstery',
    name: 'Upholstery',
    image: 'upholstery.webp',
    stage: 'Finishing',
    body: 'Covers are fitted to the foamed frame under tension. Getting this right is the difference between a crisp chair and a wrinkled one.',
  },
  {
    id: 'fitting',
    name: 'Fitting',
    image: 'fitting.webp',
    stage: 'Finishing',
    body: 'Recline mechanisms, motors, cup holders, consoles and accessories are fitted and cycled to confirm smooth travel through the full stroke.',
  },
  {
    id: 'lining',
    name: 'Lining',
    image: 'lining.webp',
    stage: 'Finishing',
    body: 'Base linings and under-covers are applied to close out the unit, protecting the mechanism and finishing the chair underneath.',
  },
  {
    id: 'packaging',
    name: 'Packaging',
    image: 'packaging.webp',
    stage: 'Despatch',
    body: 'Units are protected and boxed to survive the route to their destination, then coded and recorded ready for despatch.',
  },
]

export const stageOrder = [
  'Preparation',
  'Structure',
  'Comfort',
  'Finishing',
  'Despatch',
] as const

export function factoryImage(file: string): string {
  return `${import.meta.env.BASE_URL}images/factory/${file}`
}

export function brandImage(file: string): string {
  return `${import.meta.env.BASE_URL}images/brand/${file}`
}
