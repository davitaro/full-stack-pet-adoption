const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["dog", "cat", "rabbit"] },
    name: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["adopted", "fostered", "available"],
      default: "available",
    },
    photographer: { type: String },
    credit: { type: String },
    site: { type: String, default: "http://www.unsplash.com" },
    height: { type: Number },
    weight: { type: Number },
    color: { type: String },
    bio: { type: String, default: "No bio available" },
    hypoallergenic: { type: Boolean },
    dietaryRestrictions: { type: Array },
    breed: { type: String },
    image: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATMAAADiCAYAAAAiTSBgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAgAElEQVR4nO2df3AU55nnv81IaJAGJOQYYapwRhvD7saYH7W+wtYeCdlc9iBUUvhqdwPsUlmudgn8c4Y/9oyzqQL+WUht1RnuHyvUXkFMbeykUid2fbFVlcstNjGGCrUIRYlZYeUUuFIhI0ADI83ox7jvj1HPvP32291v//4xz6eKsjXT0/N2T/e3n+d5n+d5FVVVVRAEQSScRVEPgCAIwg9IzAiCSAUkZgRBpAISM4IgUgGJGUEQqYDEjCCIVEBiRhAxo39sBt19E1DOj6O7bwLnRkpRDykRKJRnRhDxoH9sBgevPsZosaJ7PZtRUNqzIqJRJYemqAdAEI2OmYhplCtkb8hAYkYQEWEnYhq78tmQRpRsyM0kiJCxE7Hfa2/CzcJ87e/SnhXIZpSwhpdYyDIjiJA4N1LC8cEpExFTsbR5ER7Pqbj1aF73DgmZHCRmBBEw1iIGLG1W8HgOeDxXdZLYENmBta1hDDEVkJtJEAEha4mJUQCoUPd2BTjCdEGWGUH4iJ0VtiufxR+tbMZ//dcpTM5+ani/tUnB9LwKQKXAv0PIMiMIH5AVsb8bmjZssyufxdmeZchmFCjnx2uvU+DfGWSZEYQLnKRV7O5uwcu/KOKt0bLh/QNrW/H65qUAgN7had17JGTOIDEjCAfIiJhmaV0cn8XBq4+FIsZaYxrHB6d07xPOIDEjCAns3EhAL1DnRko4fK1oiIuJREzjbqm+7dmeZf4NvkEgMSMIE2SsMNZNtPsMvy0LuZjeITEjCAFmlpWGXyKmQS6md0jMCILBSpTMXMT+sRnsvvTIkUvJ0js8TS6mD5CYEcQCZtaYlWXl5jM8vFVGLqY7SMwIAsCxG0WdqADWlpWZBedExDTIKvOHwMRMNg/HC/lcBq8820r1a4Rr3IiSmVvpRsj6x2Z0f5NV5h7fKgDCEC8rSNgIp4hEaduqFvRtbTcVFdFnZGNjIp768T2dZUa1mO7xLGZRi5gZJG6EFW5ESRQfc2ONsbDlS1731eh4FjP9k0VFtdq/ztJmBf/93y3FX35uiZevMVCuqDh49bHUYg8kbASLG1ESxdS8ik/v8DQOXn1c+5usMm94FrMlP/hEqkd5kIIiK2wkaoQbUQpCyAC9IbArn8WbW9o97a/R8Sxmh68VceqjKfsNF8jnMji6vs13S43FTtxI1BoPt4F+/jN2MTVZeKuMOmR4x7OYlSsqXrpY0M3KaGIxOavi1etFw2eyGQWvPZ8LRUxI2OyRqTv0i6jONx9olxElN59xMx6yyvzBl9lMkaABwIlNORxZ12YqKGFYaewYSdTCFS4ZwjjvvJtoF+gXWWReZixF+9/+s8na32SV+YNvqRkiseAXLz05NGWw1MK00szGyZImUYt+plkFFKU6LySJ3+efd+fsrCCzWU4/LSdKxwgG3zvNlisqlv/wXm1S4Oj6NhzbkNO9LxITfrswsBI2zapMEmKrS05Q/LQ8NLSbVnuoOZmBBrxb7rwwuXEt/T4vvLhSOoZ/BNI2m58UEAmVyEqLQtAAc1EL0w12ixu3MQjhEsHmUImsjyBnoUUWlp07F4bQUKwsOAIRM6tJAfaCFG0XpUXEW5VA+G6wHUbXUd6VC8Kd6R+bwXd/NY1v/k7WIPps2o7M7+pXCEAkZHbCxH8mCKGhGcxgCWxBE7NJAZHbyW4XtXiILEYgOCvN77gWb3U5FRQnsALAx0cBvYUuet8Ks99Bw0zY/BAyIBihIassWAJdnUk2PiayiKJyOTWCnKyou4bzjgPkVogsLy+CYoddILtcUbHkB59Yjs8OJ9aaGyETHUcQ7iVZZcGzKMidZzMKzvYsQ2nPCmxb1VJ7/fjgFLr7JmoXaDaj4Oh6vcVwfHAKx26YP5mD5si6NpT2rNBZYtqNxY7dCedGSujum8C+y48WLDH3QnZgbauUOJzY1Fa7acoVFQMP5t19oQBeAHiyGUV3w54ckk+u1rg4PovRqQrOvCAuiRstVmq/yV/83LmQ8Y0RgwrIU8+y4Alt3UyR25nNKHh9c/0iFW0TtYUGmFtp7NhFOHEh3baPYfOVzMRt96VCbYWgnauz6Nvqj3tjF+AHvFmGZm6szMTBF7oW470/Xi69fyBY14/WwwyeQC0zlmxGQd/WdqGloy3moG3DW3Funuh+YmWlmXFupITdlx5ZLgrL4sYa2Hf5kdR2rzxbt3ov3DEuexYkJzbVv1umhpdl3+W60PCTMprFb/YweX98Ft19E4aFQsz2DwTXGJH3MEjIgiE0MQPqF+GJTca8M+0HNxM0N26dn5iNnb1Q+8dm0N03AeX8uOFGYSntWeHZAugfm7F18zQ2dkbXUNitqylzfHaixrqgvKiJ9h+EyPQOT9NiJSERqphpHFnXphMFQB8j0wSNjfU4SbYMkiPr2nDo9+vWhhb/+6sPC5aWmIZfNw1vldlZdux3+hk3k4EVIr77hBlOjk8TNXVvl1DYRKLm9Py5hT3ebataqC12gEQiZkDddeMtMFbQ2EkBO7cuTE5satONe7RYwf/4uCxcnae0ZwXUvV21f+xN4yU4LmuVaexcrT/PYcJPQsgcq9Pj07Cy1jRR+4ufT7revxP4yQW/itQJMZGJGWDuUmqCxltw5YoaC+tMG/dXnlosfF+baXxzi/XF68ZiAYx942WsiijjZtmM4uhYeZfQjdVkJWr/+H+dnz830AxmuEQqZoB90P/IujbdRRAXd/Pi+Cx+cd/orpX2rJC+OdwGx2UD/yxRxs0A47Fa/YZ+xpjM0oM0nn+i2dP+zaC1MMMncjED7IP+cXQ3RQF+p/Ewt09qLy6YRtgzxPxEgNVvGIQIiGbTAQXX7s/Zzno6pX9sBq9eJ6ssbGIhZoB50B+Il7upzVjygsLHw2RxKjBeXDC3bq1f8A8l0W/IH5+fImC00qrWsBZL8yNJW1SFQFZZOMRGzABx0D9O7qZ2ofJN+7zEXJwKjBcXjA/Eh11hIfoNecJIYxBbaf5UnfAWe1ApH4SRWIkZIE590J7WUbqbVkuTecFJ3MxrHEYUiA/b3bSzzsKKM9mV2rlxO8MqjSLExE7MAKMFcfDqY5wcmhK6m2HcjGYFzHazlTI4+bwfs2N8WknY7qaVdRaki2mGKF7rxu0UxclIyMIllmJmVngOiC23IN1Nt50YghiHH1aLdvNqOC0x0vASMDcLJUSVKe/V7aQ4WTyIpZgB9aRaUbKlyHILClEMJIonLp+O4cVq8aObhRfhET2Qjt0oRprKYOV22gkaxcniQWzFDBDHeM6NlIQTBUEEs/kbLCohE8VivOJ1ZtOr8PCxwrgkmNolcvNQnCw+xFrMALEVdm6kJHy6+xk/ExUIh3GRilzmIMbhpsTIDDfCw1uHGnGoX5QVNIqTxYvYi5lVjaYomO1H/Iy/SIO+wazSFYLKJHdaYhQEfFwUiE/9opmgaTOdFCeLH7EXM0CcNHtyaMoy0dYLfAwk6BuMF2uWIN0vt9YZXxvqFv53jVusyWqm80/fL1CcLGYkQswAcdAYEFtuXq2zMPpcsVgtMhJkUNytdeamNtSMI+vahB1F4oJxprP6sCnO1R86FCeLB4kRM8DckvCzOsCPjg1+EUbeVZjteZIKO9O5pMl4y5CQxYNEiZmVJeFXdUAcuoKeGykJg8tBYDZjLEsj3cjZjIJvP8uLtxLpwjtEnUSJGWBtnXmtDoiybQtvWYbVnx4IN28v6XxnfY7LRVMjX0mMqJI4MbOyzrxWB0SZ68RblmHG7awK/Hn8Cv4nGbOZzrDbkRN6EidmgHWjPy9WRpQZ6FaTAGG4crIPAj+D/0lGE7StK+vdhqNIbyHqJFLMrBr9ObEyWHiLIy7T7GEG2GUeBI0W/Lcim1Hw2h/UHzQX7pTJ3YyQRIoZYN1Kxo27GUeLI+yMcqcPgkYK/puxsbNJV6BO8bPoSKyY2TX6MyuDMiMOFgdvDUaRUW71IPCztXSaeH3zUsfF6YT/JFbMAPNWMoB5GZTMhEBUFgc73igzys3czTikrcQRp8XpRDAoqqq6a2gVEw5fK+LUR/VqgNc3L9WZ/SeHpvDq9fpFJdoGAJTz47X/V/d2BTzq+MOfN3Vvl+4cse2ZiCrlioqXLhZ08dej69twbEPO4lOEXyTaMgPsg9ai/DPeQiP3yQg/u8oKGxCfCZI4YbdsIhEsiRczmaC1naCR+yQmyqXpkoqZoBHBk3gxA+RmL60EjRZrFSNq0QNQSoYdom4uFD8LnsTHzDTKFRXLf3iv1kLHLDYmiqGxbXcoXqZnyQ8+MbQlonMkBxvPBSh+FjSpsMwA6yaOLCILjTDHzDoj7BE1DyV3PThSI2aA/MrnfI6aBsXLjIgaKBJymMXPwl68ulFIjZvJwrpGsu4mAJx5YSn+eg3drIS/iEIgpT0rIh5V+kiVZabhxt0EgP/yCwrSEv4jCoFQOpD/pFLMZHub8blUYa2QTjQeovI7utb8JZViBrjvbUYxDSIo+MkUyj/zl1TGzDRkYhVsiY4GxTSIoOCvyRObcpa97Ah5mqIeQJBosQot0C+bhsFPFhDhcW6khOODUxgtVgzv5XMZADC8l89lcHR9WyJ+N61TspZ/dnxwisTMJ1JtmWmws5vsk7B3eFo3OUDJoNFy7EbRk+uVFFEj6ywYUhszYzFbM4BqMuNB/9gMuvsmPMeQtAV6447XFbEIMQ0hZmYrOlFNZvT0j81g96VHQrdSxK58Fv/0pXbkcxnkcxn8yWdbdO+XKyq6+yZiLw60Ipb/NISYyazcTS1tooFfUm9XPmuY9TuwthVne5Yhn8vgysQcvvnBY4wWKxgtVvC//t8s1L1dupnrJFhobteqIMxpCDED3K3cTQRL/9iMoV35m1vacWxDDurertq/Dcsz2Hf5UU3AWPGrx530sbIk/Mai9CHCPQ0jZtmMgpVL6odLF0708IvImLUrl/mtshkFZ3uWeVo3NQroIesfDSNmAPCtNfUn99auxRZbEmEgs4gMv8q8CHbxXacL2USNTAiEkKMhUjPMSHLf//6xGRy8+rgWOE9KWgKLzPl/6sf3bMVs5+os+ra21/4W9ayLcxI0n6pxfccT2NiZ6hTQQGgoyyxNaDEkjdFiBfsuP4Jyflz4LwkzfCLshAyoLr7LIlubGxeyGQU7V1Obba+QmCUILR+ru29C6iZn0Wb4kihobkhacP2VZ+tj5cWZkIPELCGcGynV8rFkc7J4khBD8pMTm8xXvY8bGzubdOlBtGaAc0jMYo5mjfH5WHr0OXJsWoO6t8t2qb20ks0olqvexw1+IiDOrnEcITGLOXxsTIx+DufJH93TiZXM2qFJx+zG5xNT44xozQBCHhKzGMMnle7KZ/Ha8+JcLJaJmU9dLYacZMxu/CQVcIuWqCPrTB4SsxjDJ5V+83NZ5qa1Lr968clmw2tmgpYGzKyupLWnprwz95CYxRg+qVQfN7N2mX7+yZzw9UZbai+JnVH4xF+aDJCDxCwhvL55KSZn68Jjt+Tb3KfmIpUk14vFaTMAvnogKZ1RRNYZuZv2kJglCC2YfWBtq2kdI0vcbwBWnGTG6nTNTt4qS1JnFJoMcA6JWYI4sq4N6t4uKSED4n8DOG1QyLpfdiTVKtPQJgM00h4O8AMSsxQT9xvAaVH4W6NlKeusf2wGr15PrlWmkcQxRwmJWYJxe7H3j834PBJ3iBoU8oLGJ73KWGd8gnHSrDIWp654I0NilhBEFgvfkVUWPuUjSszSRbSUCl7s3hotWx43714eWNuaaAuH0jTkITGLMXalOG5mJUXdXaPGTNC6+ybQsdhYknRkXRve/XIHOhbXL99d+azQvZSNL8YV3hVne7cRekjMYgxvlTht4yPKq5Lt7ho2vKAB9U4fbOyvXFGhnB/H9p8VdK7kW6NlbP/ZZGrcSw1qDyQPiVmM4dvYaDe3bFY7fzMfu1GMnVXGcmRdG0p7Vkg2mGQnN4xuZNLdSxZqDyQHdZpdIK6dZs1m+bTOslbxL+2Y+K60QNVqe3NLu9lHI0e+dlQBXw0hm4eXJNiFrP/ksy24dn8+0Su7BwGJ2QJxFTMNvhW0hvFWrqPu7cK5kRIOXyvq3K9tq1p0Bc1JgT0Hu/JZnO1ZlrhjcMq5kRKOD05J97CLe4vwICExWyDuYgY4tVYAkcw1iggkmclZFac+msL3f1N23IgzjVapLA29akI2o9RM95NDU7GvWdSWU/vdZRmhlVZH/Hxq5As9CWgidvpmyaIRZ5X/uKoFFxJoXQdJQ08AJDWHRytrkg2W78pnUdqzgoQspkzOVjtjdPdN4PjglEHItN+PnZ1ewnXRJRrczSxXVCz5wSe1v5PgahLpYeDBPL7/mzLOjRgtMVEwf+DBPDb95H7tb7pe9TS8m0kQYXNyaArfu1USxsOsZiRpLU1r6OwQREjcLMxj34ePcOWesXFmo6dV+AGJGUEEjOZO9g5P66oZVi5ZhJ2rs/hGvgVbuxZHOMJ00PBilrQZTSI5mLmTWrcQutb8paFnM4HkzmgS8eVmYR4v9j/Aq9eLBiF74clmXN/RSUIWAA1vmZ3Y1IZTH1VFLO7NDOOGqEyKJcg40A9HyxgpVvDtGIkCuZPR0vBiRjOazrETMQ2tMD4IMRspVvC314uRi5lVtj65k+HS8GIGUNxMFlkRYwnK2v32urZIhcwuW/+FJ5tx9sVl+L12usXCgs40qnEzzdU8PkhixmMnYqIyKbbuNS2MFiu4OD6L98bncOHOjEHEyJ2MFhIzUNzMDjMha4RaT5mib8oRiwckZqi6meRqyrN15WL8y1eW+75fzQIEELk4yBR9x1nEtMmIC3eMIhzncXuhoWszWQ5fK9ass0buCSWC76WWzSh4ffNSy5vBTXul7r6J2o0X1W9gVS+ZzSjY2rUYX+xqxtauxXjhyebQx8ee1+s7njAVLDvSeI2TZbYAuZrmaFaqJmhaX7VyRfW19fa31iypfUeYVoOVFQNEY8mw8bmL47PCcbFF505Jm1UGkGWmg21NfGJTjlxNDlG326Pr23BsQ86wbdwbX8YpFlauqLgyMYcr9+Zw4+E8rkzMOba0eBpxMoLEjIFcTXtEgsbf9P1jM9j+s8na+3ESM7tYWBgiwFpdVybmcLPgbvm4RhQsK0jMGPj+Zmd7lhmeym5yrUTkcxm88JnmWvwlSflI5YqKly4WdCujZzMK/mpNFkOTFVx/MIfCbP2yioOYWYlYEKJg57raYRafi7vFGyUkZhysqymyztggddjkcxnsXJ3FK8+2YuUScVltWGU+susRxCF94+L4LF66WJBqgOgUL/36WV54shkblzdjw/IMNi5vNp1cIDEzJznmQEgcXd+mC3TzsEHqsBktVnDqo6maK5zPZfDKs626IHxYZT4y6xEEvaK4rHDzrai9ipjTFZN44jArmkbIMhNgNxHAWyVurI+BB/O62Sq7BSzcIHPT+mHJ6c+HCkBBW5OC157P4a/XBLfQ8N8NTeFvrxd1ForoeLQ4nxcRcxpeCCqeRZaZOSRmAuI6EXDhzgyOD05h4IGxU6kZduMXCYJb2IeAzHcHgZ/Hw2IVXggzdYPEzBwSMwHliorlP7wX6zSNOMasvvzTh/g/d2drf2/+zGJc2e5/pUAU8LO4Ua0/SmJmDomZCXG1zuJK/9gMdl16hALjLstUChDy3C19iqd+fK/2N4mZnobvNGvGiU11S4wqAuzZd1kvZEDdeuwdno5oVOniu7+qn8eNnTRpwENiZgLvPti5c41M7/A07pbqQrb5M/WAtyZox25EMwOcJt4arV+DR9fHK+wRB0jMLGAFTevmEDfKFRUXx2dxcmgKuy8V8KWfPsRbo+XQvr9/bAavXq+vnbArn8WV7ctxYpO+xOn44BS6+ybooeAB9oGxc3VLhCOJJxQzs4AP+sZpIqB3eBqnb5aEpTBhxfjOjZRw+FpRl1ZS2rOi9hAwqxR47fmcrwXqjQIF/60hy8yCI+vacOj36+IV9epN50ZK6O6bgHJ+HAevPtYLGeMVh/HU7h2exr7Lj3RCdmBtq86azWYU9G1t100AaG5n2FZa/9gMuvsmyDpMMWSZ2cDXa4b5RHRa39e8SMH//g8d+ELARccii8wuBURUoA6oyDYtwp/nW/APL7YHNNoqT/34Xs1Nc2q5Ok2Yzecy2LaqhRJmQ4bETAI2GdSs5Y0X3BYlr+towtBk3Trblc/izS32otA/NlObGfvm72SlUyfMbmrWtbTCWCmwaOG/4tIsPxCN2WnunZ/1uF4aDJCYWUNiJgGbcwb4EztzK2BasubJoSmd27ttVQv6trZLiQpvpTz8xpO2n9NbYyqgKIDqLin3P18u4OzIDDQh4/Ero75/bAa7L+ldYVnBZxFblcGQz2VqBedbVy7GxuXN6FisoHd4WjcJRWJmhMRMAj6Q7SbAPlqs4MrEHN4bn0P/2IyUgJnV9x27UXQtZIDe0pS5ufnv03CbFMuKaRUFZsKm4VTgzIQsjKx9r+1/ePK5DO6WPkW58ikAxZUgNwIkZpLwJU7XdzyBjZ3WLoLsRe2kKNmrkAF1S3Pn6ize3GJ+c5t1h8goCipqvU2SE0HjGzceWNuK157PSZVmsViJm5uYXlgE0WAgyb3x/ITEzAG7LxVqOVw7V2fRt9X4dAxCwDT8EDIZzERM+75TH007XuBE2y8vMry75Naly+cy+E9Pt+B/3jZavXERMhkGHsxj4OEcbjysYODhHC4yta6yrFyyCLvySyz73qUREjMHDDyY1y0i8fAbK6Qb83ntYRWWkPGxGQ3eRXOyYpPZxIGsyNgLXLXtkIgkCZkIfT2mgvbFiqFszIxsRsFffm5Jw7TVJjFzyOJ/HMecpGfgV0+rMC0y3nKyijN5CYx7ERn99+pnRXmSvkYkW9u6sbMZ13d0GrZx4rom/XxYQWImiWyukd9N+V69XsTJoeCFTBTkl0m5cCpofgfhxWkT+gmFpHY94a3kvq0dUgnRdn3vkno+7GjMSKELzIRs+eJF+G/P53x/0t0szGPfh49w5V79ggxCyMziY3w2vxn8mppWBOHysW3Mtf3zAptEK+Ru6VMcvlY/hm2rWqQrO3aurm6rxW97h6d1nV/S2gWGLDNJ2Bvkd5c14d8eVZNVg3jKaTlk7EUXhJCJrLGgLD/CGWxu48bOZny4bbnr34QX96THEc0gMXMBn6bhV1WAyBrLZhQcXd/ma4G7mcscVfdUQs/d0qfo7puoXV+y7mWjQ26mC7IZBQfWttaenMcHp5DNKJ4ER0t3YK2xF55sxtkXl/maNyQK8pM1Fi9Yq3xjZzMJmSSNk4TiMyc2tWHbqvpFdnxwynU3hmM3ijh87bFuvc4Tm3L4cFunr0J27EbR0OliVz5LQhYjeoendZ15qQmjPORmeoB3N92U9/BxqyCsMa95XkR4sKVe21a14N0vd0Q8ouRAlpkHtHiWhuyKSUB1JezD14z5Y//yleWuhKx/bAZf+ulD4Xfvu/xIJ2TbVrWgtGcFCVnMOHajqKtZFVWYEOaQZeYDomx4sxnOyVkVpz6awumbJV/jVuwTXUuMXLlkkcEi2/yZZlz8Y/czY0Qw8BY6FZM7h8TMJ3hBE81w9g5P49XrU4YMbT8C8PwCvGakNWEyyYRV4ZF2yM30CVGLbXZFomM3ijh49bFOyPK5DM72LMO7X+7wfOHKBoqTmECaZnqHp0nIfIIsMx8RLeCRz2WwYXkT/umO/rWg6uNE5UUU6I8nfD4ZCZk3SMx8RiRoLHTBEkA1dnrw6qNaSymvWf4EuZm+o61I9NLqFkNXmuc6mkjICPQOT6O7b0K3vunR9W10XXiExCwAeodLeHdslutKo+DW40qoC/QS8UMUO3VSRE6YQ26mj0zOqth3+REu3KkLFttiGqBFcBsZftYyzb3FooDEzCeu3JvD7p8XdDldWjb/hTszhqB8EEvWEfGF0i+ChwrNfUBUJK4t1JHNKDiykNHPCpp2YZOgpRtRvzgSsmAgy8wj/BO3Y/EivL55KXbls4ZtzVI3yNVIJ9QvLlxIzFwy8GAep29O62ohN3Y2481/b10kLhI0t+tPEvFFJGTULy5YSMwc0js8je/+atp0GTaZC9WsIJ2stGRjt0QfiViwkJg5wGxlb7cXqyhbn2Y7k4nf1wbhHBIzCUT9wPxahclsdaN8LoNXnm0lUYsxZpaYBrmV4UJiJgG/nFkQT1srUSPXMz7YCRhZYtFBYiYBKzRBPm2tmjuSqEWPmSupQZZYtJCYxRA7USP3M3i0Jprf/03ZcuFnErD4QGIWY6xWCydR8x87F1KDXMl4QmKWAKxEDSBhc4us9cVCllh8ITFLEDILplBszRyn4kXnMlmQmCUQWVEja62KrPsIkOWVZEjMEo6T5e0aReCciBdZX+mBxCxF2MXWrEiy0DlxH0m80guJWQpxYq2Zkc9lsHN1Fq8824qVS+LVkNiJ5aVB7mP6ITFrEPwSuDCtNzeipUHi1XiQmBG+CF3UkPtIkJgRQi7cmcHxwSkMPJiLeihCyPIieEjMCCmist5ItAhZSMwIgkgF8ZqmIgiCcAmJGUEQqYDEjCCIVEBiRhBEKiAxIwgiFZCYEQSRCkjMCIJIBSRmBEGkAhIzgiBSAYkZQRCpgMSMIIhUQGJGEEQqIDEjCCIVkJgRBJEKSMwIgkgFJGYEQaQCEjOCIFIBiRlBEKmAxIwgiFRAYkYQRCogMYsRH//yAZTz4/jDX85HPZRUITyvtwtQzo/jW7fd70/qsx6+h3AGiRlBEKmgKeoBEHWeea4T6nNRjyJ90HltDMgyIwgiFZBlZsPHv3yANQPAqa93Yu3gOL46qr2TxTt727Fd8Jl3L7HbWW+r43YByntl7P9iF773NPtaBae+3okdtx9gzcCcYZ/VMRpfF+27TjNOfb0TL7fbbVdHNy6U8a3zBZwxfd/+OM3GUj1/4vEZ3mdJA6sAAARbSURBVJM5LtF5dTk2Hv25t95Wj4fzR4hRCUtuDd5X8cZdFW/cVXsG5xZenVNP/fNdFW9Mqu/oti6p+9+4q+Kfi+qt2mvatvfVU5M2X/bbSRVv3FX3/9b4mv77F77njUl1//t3VbxfshzXO7pt9J/XjX/hu0Tfo9tusqj2vKHfp3aedGMXIDUWwzi4bRfOr9PjEp1X9jXZ/bHXBLv9O+8LfmfRd3s4f4Q55GZK0rPxCXzwnGbINuHlDVkAZVxgZqnevVTAGTTj1Bfa8Ezt1Sa8/LV27MccDg2KLR4p8u3M92fxNxubAZRxBu1Qt2Qtx7V9SxezTfXz3/siv908Tt8oAx05fN/wPRUMF5jjHCzickcOt5h9PvPcMpzqAM7cmMLHFochNZanW7AfwOXRGf2+ChUMAejJt+AZ6eOSx/H+uHOwfYvc7+zl/BHmkJhJsq6d88jbm9ADYKigTffPY3gSQEcLdhjcjCx25gGMzuBdl9+//7NZ3d/PtGeEr2vUx2WN3XbV75nDr2tiVsaFUQAdGUawAaAJazsATM7jltQ3W41lQUQnZ/ATRkQ/vj2Dy8jiO8/ZR0dkj9/52Ors39BmOAef74DN7xzc+Wt0KGbmG/P49SSAPH+RslQtnO1SMZV48HGhAqAZn9fGvGAdYbQAZbRg/kGPPPN0C3oGivjR7Xm8/FwTgHn8ZHQOyLfaxx4jQxMki01COn+NCIlZg6APVIuouqiH3ivi72+3LQSiy/j7gTmgI2e0NvPtnEvm51gAtLfgzzqKODQ5D6AJKMzgR5PA/g3675Tal99j8wMP548QQ2LmN5MVfAyYWGcZrA3dKpvH6bfv49BkM059vas+02aYtdNiZs0Yem8civYyf9O1Z7AOwOVAxwIATdiRb8ahgRm8uyWLNZqL+bSbffk9NvN9VEMNTVhjtomn80dYQTEz31iIi3FxnioLcZJ8SwQukub+ttqkDFS368kvwwd7u6Bq/wzWg0xcyOtYqjzzdAt6UMaF25qLyZ4/Z/vye2wAcOa3nMgtWI/GeBiLl/NHWEFi5iPb1+fQgzkcep+dkZrH6bcLOIMs3onErRDcPIUp/KHAEvp8B3B54D6U8+P6f2+zx9OEl7+QQw/K+Orb+pm3j3/5AMolKytGdiwLtLfgzzqAM7+dwq8n+ckOh/uyxen+mtEzWWCOdx6n3y/iMppxar3V7+zl/BFWkJvpJ+1t+GBvC06/fR9rzhfrr+fboX4tqvhINTXk1+cL+Op57UapJtZeOF+oBqMXttuRb8ah0Rbc+ho7S1dN7lzzNuqvt7fhg72Z6uv8cVoKtuxYuDENlKsPg6e97MsOp/vL4Dtf6wQujUM5X9Btb2t9uz5/hBWKqqpq1IMgYoBFljxbBeGPS0cQ/kNuJgFAS8EQc2syhNk9gvAIiRkBQAu2CzLQbxeqdaa+BdoJIhjIzSQYjMXPABVAE8mAxIwgiFRAbiZBEKmAxIwgiFTw/wFgeTUGi29wtAAAAABJRU5ErkJggg==",
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;