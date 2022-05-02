import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const QuestionWrapper = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-bottom: 50px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 150px;
`;
const InputWrapper = styled.div``;
const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-family: inherit;
  font-size: 20px;
`;
export const JeopardyGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
    difficulty: "",
    category: "",
  });
  const [input, setInput] = useState("");
  const [storedQuestions, setStoredQuestions] = useState([]);
  useEffect(() => {}, []);
  const [questionCount, setQuestionCount] = useState(0);
  function getQuestion() {
    axios
      .get("https://opentdb.com/api.php?amount=1")

      .then((res) => {
        const data = res.data;
        setCurrentQuestion({
          question: data.results[0].question,
          answer: data.results[0].correct_answer,
          category: data.results[0].category,
        });
      });
  }
  function parseString(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
      nbsp: " ",
      amp: "&",
      quot: '"',
      lt: "<",
      gt: ">",
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
  function newQuestion() {
    setCurrentQuestion({
      question: storedQuestions[questionCount].question,
      answer: storedQuestions[questionCount].answer,
      category: storedQuestions[questionCount].category,
    });
  }
  function getBulkQuestion() {
    axios
      .get("https://opentdb.com/api.php?amount=50&type=multiple")
      .then((res) => {
        const data = res.data;
        setStoredQuestions(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getBulkQuestion();
    console.log(storedQuestions[questionCount]);
  }, []);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    if (lowercaseString(input) == lowercaseString(currentQuestion.answer)) {
      // setCurrentQuestion({
      //   question: storedQuestions[questionCount].question,
      //   answer: storedQuestions[questionCount].correct_answer,
      //   category: storedQuestions[questionCount].category,
      // });
      document.getElementById("input").value = "";
    }
  }, [input]);

  return (
    <Wrapper>
      <div>test</div>
      <QuestionWrapper>{parseString(currentQuestion.question)}</QuestionWrapper>
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
        <br />
        Answer: {currentQuestion.answer}
        <br />
        Difficulty: {currentQuestion.difficulty}
        <br />
        Category: {currentQuestion.category}
      </div>
    </Wrapper>
  );
};
