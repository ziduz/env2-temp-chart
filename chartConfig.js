// chartConfig.js
import {
  outtemp,
  basecase,
  option1,
  option2a,
  option2b,
  option3a,
  option3b,
  option4a,
  option4b,
  final,
  experimentA,
  experimentB
} from './data.js';

function getMockData(length) {
  return Array.from({ length }, () => 20 + Math.random() * 10);
}

function validOrMock(arr) {
  return Array.isArray(arr) && arr.length === 8760 ? arr : getMockData(8760);
}

export const chartSeries = [
  {
    id: "outdoor",
    fullName: "Outdoor Temperature",
    titleName: "Outdoor Temperature",
    hoyData: validOrMock(outtemp),
    defaultColor: "#AAAAAA",
    isOutdoor: true,
    notes: ""
  },
  {
    id: "base",
    fullName: "Operative Temperature Base Case",
    titleName: "Base Case",
    hoyData: validOrMock(basecase),
    defaultColor: "#638EFF",
    notes: "No shading, original construction set"
  },
  {
    id: "opt1",
    fullName: "Operative Temperature Design Option 1",
    titleName: "Design Option 1",
    hoyData: validOrMock(option1),
    defaultColor: "#FF4040",
    notes: "Original construction set"
  },
  {
    id: "opt2a",
    fullName: "Operative Temperature Design Option 2A",
    titleName: "Option 2A",
    hoyData: validOrMock(option2a),
    defaultColor: "#BE00BF",
    notes: "Reverse brick veneer with R2.5 insulation"
  },
  {
    id: "opt2b",
    fullName: "Operative Temperature Design Option 2B",
    titleName: "Option 2B",
    hoyData: validOrMock(option2b),
    defaultColor: "#349737",
    notes: "Straw bale R6"
  },
  {
    id: "opt3a",
    fullName: "Operative Temperature Design Option 3A",
    titleName: "Option 3A",
    hoyData: validOrMock(option3a),
    defaultColor: "#348097",
    notes: "Timber floor on ground"
  },
  {
    id: "opt3b",
    fullName: "Operative Temperature Design Option 3B",
    titleName: "Option 3B",
    hoyData: validOrMock(option3b),
    defaultColor: "#B2A90F",
    notes: "Tiled slab on sandbed"
  },
  {
    id: "opt4a",
    fullName: "Operative Temperature Design Option 4A",
    titleName: "Option 4A",
    hoyData: validOrMock(option4a),
    defaultColor: "#FFCD00",
    notes: "Clay tile roof with R3 insulation"
  },
  {
    id: "opt4b",
    fullName: "Operative Temperature Design Option 4B",
    titleName: "Option 4B",
    hoyData: validOrMock(option4b),
    defaultColor: "#57F30F",
    notes: "Reverse concrete roof with R3 insulation"
  },
  {
    id: "expA",
    fullName: "Operative Temperature Experiment A",
    titleName: "Experiment A",
    hoyData: validOrMock(experimentA),
    defaultColor: "#5712B4",
    notes: "2A + 3B + 4A, insulated internal wall"
  },
  {
    id: "expB",
    fullName: "Operative Temperature Experiment B",
    titleName: "Experiment B",
    hoyData: validOrMock(experimentB),
    defaultColor: "#66B412",
    notes: "2A + 3B + 4B, insulated internal wall, double glazing"
  },
  {
    id: "final",
    fullName: "Operative Temperature Final Design",
    titleName: "Final",
    hoyData: validOrMock(final),
    defaultColor: "#8300FF",
    notes: "Experiment B with optimised natural ventilation"
  },
  {
    id: "comfort",
    fullName: "Comfort Band",
    titleName: null,
    hoyData: null,
    defaultColor: "#E1F0E1",
    isBand: true,
    notes: "18-28°C"
  }
];
