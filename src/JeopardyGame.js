import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

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
export const JeopardyGame = (theme) => {
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
    difficulty: "",
    category: "",
    wrongAnswers: [],
  });
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
  function handleMouseOver(index) {
    const finger = document.getElementById("finger-" + index);
    finger.style.opacity = "1";
  }
  function handleMultipleChoiceClick(value, e) {
    if (value === currentQuestion.answer) {
      if (gameMode === "Multiple Choice") {
        getQuestion(e, "type=multiple");
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
              <InformationWrapper>
                <span>{currentQuestion.category}</span>

                <GameModeWrapper
                  onClick={() => {
                    handleToggleMode();
                  }}
                >
                  Toggle Gamemode
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
      </Wrapper>
    </>
  );
};
