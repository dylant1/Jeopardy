import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const QuestionWrapper = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  flex-direction: column;
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
  margin-left: 50px;
  margin-right: 50px;
`;
const InputWrapper = styled.div``;
const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-family: inherit;
  font-size: 20px;
`;
const InformationWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  color: grey;
  font-size: 15px;
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
  font-size: 15px;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 5px;
  display: flex;
  align-items: center;
`;
export const JeopardyGame = (theme) => {
  const [currentTheme, setcurrentTheme] = useState(theme);
  const [textColor, setTextColor] = useState(
    currentTheme === "light" ? "black" : "white"
  );
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
    difficulty: "",
    category: "",
    wrongAnswers: [],
  });
  const [loaded, setLoaded] = useState(false);
  const [gameMode, setGameMode] = useState("Multiple Choice");
  const [input, setInput] = useState("");
  useEffect(() => {
    getQuestion();
    progressBar();
  }, []);
  function handleMouseOver(index) {
    const finger = document.getElementById("finger-" + index);
    finger.style.opacity = "1";
  }
  function handleMultipleChoiceClick(value, e) {
    if (value === currentQuestion.answer) {
      getQuestion(e);
    } else {
      // e.target.style.color = "red";
      e.target.style.textDecoration = "line-through";
      //add multiple choice class
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

  function multipleChoiceAnswers(wrong, correct) {
    wrong.push(correct);
    const set = new Set(wrong);
    const arr = Array.from(set).sort();
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
        })}{" "}
      </>
    );
  }
  function handleToggleMode() {
    if (gameMode === "Multiple Choice") {
      setGameMode("Open Ended");
    } else if (gameMode === "Open Ended") {
      setGameMode("Multiple Choice");
    }
  }
  const [storedQuestions, setStoredQuestions] = useState([]);
  function getQuestion(e) {
    axios
      .get("https://opentdb.com/api.php?amount=1&type=multiple")

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
      document.getElementById("question-2").style.textDecoration = "none";
      document.getElementById("question-3").style.textDecoration = "none";
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
  function lowercaseString(string) {
    return string.toLowerCase();
  }
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    if (gameMode === "Open Ended") {
      if (lowercaseString(input) == lowercaseString(currentQuestion.answer)) {
        getQuestion();

        document.getElementById("input").value = "";
      }
    }
  }, [input]);

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
                  Toggle gamemode
                </GameModeWrapper>
              </InformationWrapper>
              {parseString(currentQuestion.question)}
            </QuestionWrapper>
            {gameMode === "Open Ended" && (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Input
                    onChange={handleChange}
                    id="input"
                    autoComplete="off"
                    type="text"
                    placeholder="Answer"
                  />
                </form>
              </div>
            )}
            {gameMode === "Multiple Choice" && (
              <div>
                {multipleChoiceAnswers(
                  currentQuestion.wrongAnswers,
                  currentQuestion.answer
                )}
              </div>
            )}{" "}
            {gameMode === "True False" && <div>True and False</div>}
          </>
        )}
      </Wrapper>
    </>
  );
};
