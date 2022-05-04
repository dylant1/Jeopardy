import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import refresh from "./assets/refresh.svg";
const QuestionWrapper = styled.div`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  flex-direction: column;
  @media (max-width: 1024px) {
    font-size: 25px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 15px;
  }
  @media (max-width: 319px) {
    font-size: 10px;
  }
`;
const GameModeWrapper = styled.div`
  color: #1cbaf7;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;
  @media (max-width: 1024px) {
    margin-bottom: 150px;
  }
  @media (max-width: 768px) {
    margin-bottom: 125px;
  }
  @media (max-width: 480px) {
    margin-bottom: 100px;
  }
  @media (max-width: 319px) {
    margin-bottom: 150px;
  }
  margin-left: 50px;
  margin-right: 50px;
`;

const InformationWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  color: grey;
  font-size: 15px;
  @media (max-width: 1024px) {
    font-size: 15px;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 480px) {
    font-size: 8px;
  }
  @media (max-width: 319px) {
    font-size: 7px;
  }
`;
const Bar = styled.div`
  background-color: white;
  height: 24px;
  width: 250px;
  border: 1px solid black;
  margin-bottom: 50px;
  border-radius: 2px;
`;
const CheckMarkWrapper = styled.div`
  position: absolute;
  transform: scale(0.5);
  visibility: hidden;
  opacity: 0;
  transition: 0.5s;
`;
const Loading = styled.div`
  background-color: #1fc623;
  width: 1%;
  height: 24px;
  color: white;
`;
const AnswerChoice = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 20px;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 5px;
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    font-size: 15px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
  @media (max-width: 319px) {
    font-size: 10px;
  }
`;
const Img = styled.img`
  width: 25px;
  @media (max-width: 1024px) {
    width: 25px;
  }
  @media (max-width: 768px) {
    width: 18px;
  }
  @media (max-width: 480px) {
    width: 10px;
  }
  @media (max-width: 319px) {
    font-size: 10px;
  }
  margin-bottom: 5px;
  cursor: pointer;
`;
const AnswerWrapper = styled.div`
  color: #ff2825;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function CheckMark() {
  return (
    <svg
      width="347"
      height="276"
      viewBox="0 0 347 276"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.2843 142.142C28.0948 134.332 40.7581 134.332 48.5685 142.142L147.563 241.137L119.279 269.421C111.469 277.232 98.8054 277.232 90.9949 269.421L6.14214 184.569C-1.66835 176.758 -1.66835 164.095 6.14214 156.284L20.2843 142.142Z"
        fill="#62B01F"
      />
      <path
        d="M105 198.967L297.825 6.14214C305.635 -1.66834 318.299 -1.66835 326.109 6.14213L340.251 20.2843C348.062 28.0948 348.062 40.7581 340.251 48.5685L147.426 241.393L105 198.967Z"
        fill="#62B01F"
      />
    </svg>
  );
}

export const JeopardyGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
    difficulty: "",
    category: "",
    wrongAnswers: [],
  });
  const [showAnswer, setShowAnswer] = useState(false);
  const [deg, setDeg] = useState(180);
  const [loaded, setLoaded] = useState(false);
  const [gameMode, setGameMode] = useState("Multiple Choice");
  useEffect(() => {
    if (gameMode === "Multiple Choice") {
      getQuestion(null, "type=multiple");
    } else if (gameMode === "True False") {
      getQuestion(null, "type=boolean");
    }
    progressBar();
  }, []);
  useEffect(() => {
    progressBar();
  }, [loaded]);
  function Eye() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-eye eye-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="#ff2825"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="2" />
        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
      </svg>
    );
  }
  function handleMouseOver(index) {
    const finger = document.getElementById("finger-" + index);
    finger.style.opacity = "1";
  }
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const showCheckMark = async () => {
    let checkMark = document.getElementById("check-mark-wrapper");
    checkMark.style.visibility = "visible";
    checkMark.style.opacity = "1";
    await delay(500);
    checkMark.style.visibility = "hidden";
    checkMark.style.opacity = "0";
  };
  function handleMultipleChoiceClick(value, e) {
    if (value === currentQuestion.answer) {
      if (gameMode === "Multiple Choice") {
        getQuestion(e, "type=multiple");
        showCheckMark();
      } else if (gameMode === "True False") {
        getQuestion(e, "type=boolean");
      }
    } else {
      e.target.style.textDecoration = "line-through";
    }
  }
  function handleMouseLeave(index) {
    let finger = document.getElementById("finger-" + index);
    finger.style.opacity = "0";
  }
  function progressBar() {
    let element = document.getElementById("progress-bar");
    let width = 1;
    let identity = setInterval(scene, 2.5);
    function scene() {
      if (!loaded) {
        if (width >= 100) {
          clearInterval(identity);
          setLoaded(true);
        } else {
          width++;
          element.style.width = width + "%";
        }
      }
    }
  }
  function handleRefresh() {
    let spinner = document.getElementById("refresh");

    spinner.style.transform = "rotate(" + deg + "deg)";
    setDeg(deg + 180);
    if (gameMode === "Multiple Choice") {
      getQuestion(null, "type=multiple");
    } else if (gameMode === "True False") {
      getQuestion(null, "type=boolean");
    }
  }

  function multipleChoiceAnswers(correct, wrong, numQuestions = 4) {
    wrong.push(correct);
    let set = new Set(wrong);
    let arr = Array.from(set).sort();
    if (numQuestions === 2) {
      arr = arr.reverse();
    }
    return (
      <>
        {arr.map((value) => {
          return (
            <AnswerChoice key={arr.indexOf(value)}>
              <span
                id={"question-" + arr.indexOf(value)}
                onClick={(e) => {
                  handleMultipleChoiceClick(value, e);
                }}
                onMouseEnter={() => {
                  handleMouseOver(arr.indexOf(value));
                }}
                onMouseLeave={() => {
                  handleMouseLeave(arr.indexOf(value));
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {parseString(value)}
              </span>
              <span
                id={"finger-" + arr.indexOf(value)}
                style={{
                  opacity: "0",
                }}
              >
                👈
              </span>
            </AnswerChoice>
          );
        })}
      </>
    );
  }
  function handleToggleMode() {
    if (gameMode === "Multiple Choice") {
      setGameMode((null, "True False"));
      setLoaded(false);

      getQuestion(null, "type=boolean");
    } else if (gameMode === "True False") {
      setGameMode("Multiple Choice");
      setLoaded(false);

      getQuestion(null, "type=multiple");
    }
  }
  function getQuestion(e = null, type) {
    setShowAnswer(false);
    if (type === "type=multiple") {
      setGameMode("Multiple Choice");
    } else if (type === "type=boolean") {
      setGameMode("True False");
    }
    axios
      .get(`https://opentdb.com/api.php?amount=1&${type}`)

      .then((res) => {
        const data = res.data;
        setCurrentQuestion({
          question: data.results[0].question,
          answer: data.results[0].correct_answer,
          category: data.results[0].category,
          wrongAnswers: data.results[0].incorrect_answers,
        });
      });
    if (e) {
      document.getElementById("question-0").style.textDecoration = "none";
      document.getElementById("question-1").style.textDecoration = "none";
      if (document.getElementById("question-2")) {
        document.getElementById("question-2").style.textDecoration = "none";
      }
      if (document.getElementById("question-3")) {
        document.getElementById("question-3").style.textDecoration = "none";
      }
    }
  }

  function parseString(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
      nbsp: " ",
      amp: "&",
      quot: '"',
      lt: "<",
      gt: ">",
      eacute: "e",
      ouml: "o",
      Ouml: "O",
      ldquo: '""',
    };
    return encodedString
      .replace(translate_re, function (match, entity) {
        return translate[entity];
      })
      .replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
  }

  return (
    <>
      <Wrapper>
        {!loaded && (
          <Bar>
            <Loading id="progress-bar"></Loading>
          </Bar>
        )}
        {loaded && (
          <>
            <QuestionWrapper>
              {" "}
              <InformationWrapper style={{}}>
                <Img
                  src={refresh}
                  onClick={() => {
                    handleRefresh();
                  }}
                  style={{}}
                  id="refresh"
                />{" "}
                <AnswerWrapper
                  onClick={() => {
                    setShowAnswer(true);
                  }}
                >
                  {!showAnswer ? (
                    <div
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Eye />{" "}
                      <span
                        style={{
                          paddingLeft: "5px",
                        }}
                      >
                        Show Answer
                      </span>
                    </div>
                  ) : (
                    <>{parseString(currentQuestion.answer)}</>
                  )}
                </AnswerWrapper>
              </InformationWrapper>
              <InformationWrapper>
                <span>{currentQuestion.category}</span>

                <GameModeWrapper
                  onClick={() => {
                    handleToggleMode();
                  }}
                >
                  {gameMode}
                </GameModeWrapper>
              </InformationWrapper>
              {parseString(currentQuestion.question)}
            </QuestionWrapper>
            {gameMode === "Multiple Choice" && (
              <div>
                {multipleChoiceAnswers(
                  currentQuestion.answer,
                  currentQuestion.wrongAnswers
                )}
              </div>
            )}
            {gameMode === "True False" && (
              <div>
                {multipleChoiceAnswers(
                  currentQuestion.answer,
                  currentQuestion.wrongAnswers,
                  2
                )}
              </div>
            )}
          </>
        )}
        <CheckMarkWrapper id="check-mark-wrapper">
          <CheckMark />
        </CheckMarkWrapper>
      </Wrapper>
    </>
  );
};
